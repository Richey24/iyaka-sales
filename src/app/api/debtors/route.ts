import { connectDB } from "@/lib/db";
import { Debtor } from "@/models/debtor";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { debtorSchema } from "@/utils/validation";

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
        const parsed = debtorSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const debtor = await Debtor.create({ ...parsed.data, companyId: decoded.companyId });
        return NextResponse.json({ message: "Debtor created successfully", debtor }, { status: 201 });
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
        const debtors = await Debtor.find({
            companyId: decoded.companyId,
            name: { $regex: search, $options: "i" }
        })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        return NextResponse.json({ debtors }, { status: 200 });
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
        const parsed = debtorSchema.partial().safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const debtor = await Debtor.findOneAndUpdate({ _id: id, companyId: decoded.companyId }, parsed.data, { new: true });
        if (!debtor) {
            return NextResponse.json(
                { message: "Debtor not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Debtor updated successfully", debtor }, { status: 200 });
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
        const debtor = await Debtor.findOneAndDelete({ _id: id, companyId: decoded.companyId });
        if (!debtor) {
            return NextResponse.json(
                { message: "Debtor not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Debtor deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}