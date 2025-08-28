import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/utils/validation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";
import "@/models/category";

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
        const parsed = productSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const product = await Product.create({ ...parsed.data, companyId: decoded.companyId });
        return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
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
        const products = await Product.find({
            companyId: decoded.companyId,
            name: { $regex: search, $options: "i" }
        })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .populate("category")
            .sort({ createdAt: -1 });
        const totalProducts = await Product.countDocuments({
            companyId: decoded.companyId,
            name: { $regex: search, $options: "i" }
        });
        return NextResponse.json({ products, total: totalProducts, totalPages: Math.ceil(totalProducts / Number(limit)) }, { status: 200 });
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
        const parsed = productSchema.partial().safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const product = await Product.findOneAndUpdate({ _id: id, companyId: decoded.companyId }, parsed.data, { new: true });
        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Product updated successfully", product }, { status: 200 });
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
        const product = await Product.findOneAndDelete({ _id: id, companyId: decoded.companyId });
        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}