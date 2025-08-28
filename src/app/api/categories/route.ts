import { connectDB } from "@/lib/db";
import { Category } from "@/models/category";
import { categorySchema } from "@/utils/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
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
        const body = await req.json();
        const parsed = categorySchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }

        await connectDB();
        const category = await Category.create({ ...parsed.data, companyId: decoded.companyId });
        return NextResponse.json({ message: "Category created successfully", category }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
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
        const categories = await Category.find({
            companyId: decoded.companyId,
            name: { $regex: search, $options: "i" }
        })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        const total = await Category.countDocuments({ companyId: decoded.companyId });
        return NextResponse.json({ categories, total, totalPages: Math.ceil(total / Number(limit)) }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
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
        const params = req.nextUrl.searchParams;
        const id = params.get("id");
        const body = await req.json();
        const parsed = categorySchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }

        await connectDB();
        const category = await Category.findOneAndUpdate({ _id: id, companyId: decoded.companyId }, { ...parsed.data }, { new: true });
        if (!category) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Category updated successfully", category }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const id = params.get("id");

        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        const category = await Category.findOne({ _id: id, companyId: decoded.companyId });
        if (!category) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }
        await connectDB();
        await Category.findByIdAndDelete(id);
        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}