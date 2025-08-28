import { expensesSchema } from "@/utils/validation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { Expenses } from "@/models/expenses";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        const body = await request.json();
        const parsed = expensesSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const expenses = await Expenses.create({ ...parsed.data, companyId: decoded.companyId });
        return NextResponse.json({ message: "Expenses created successfully", expenses }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;
        const page = params.get("page") ?? "1";
        const limit = params.get("limit") ?? "10";
        const search = params.get("search") ?? "";

        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        await connectDB();
        const expenses = await Expenses.find({
            companyId: decoded.companyId,
            description: { $regex: search, $options: "i" }
        })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        return NextResponse.json({ expenses }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const params = request.nextUrl.searchParams;
        const id = params.get("id");
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        const body = await request.json();
        const parsed = expensesSchema.partial().safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const expenses = await Expenses.findOneAndUpdate({ _id: id, companyId: decoded.companyId }, parsed.data, { new: true });
        if (!expenses) {
            return NextResponse.json(
                { message: "Expenses not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Expenses updated successfully", expenses }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const params = request.nextUrl.searchParams;
        const id = params.get("id");
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        await connectDB();
        const expenses = await Expenses.findOneAndDelete({ _id: id, companyId: decoded.companyId });
        if (!expenses) {
            return NextResponse.json(
                { message: "Expenses not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Expenses deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}