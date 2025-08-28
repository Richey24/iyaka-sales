import { NextRequest, NextResponse } from "next/server";
import { salesSchema } from "@/utils/validation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { Sales } from "@/models/sales";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        const data = await req.json();
        const parsed = salesSchema.safeParse(data);
        if (!parsed.success) {
            return NextResponse.json({ errors: z.treeifyError(parsed.error), message: "Invalid request body" }, { status: 400 });
        }
        await connectDB();
        const sales = await Sales.create({ ...parsed.data, companyId: decoded.companyId });
        return NextResponse.json({ message: "Sales created successfully", sales }, { status: 201 });   
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
        const paymentMethod = params.get("paymentMethod") ?? "";
        const startDate = params.get("startDate") ?? "";
        const endDate = params.get("endDate") ?? "";

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
        const sales = await Sales.find({
            companyId: decoded.companyId,
            "items.productName": { $regex: search, $options: "i" },
            ...(paymentMethod && { paymentMethod: paymentMethod }),
            ...(startDate && { saleDate: { $gte: new Date(startDate) } }),
            ...(endDate && { saleDate: { $lte: new Date(endDate) } })
        })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        const totalSales = await Sales.countDocuments({
            companyId: decoded.companyId,
            "items.productName": { $regex: search, $options: "i" },
            ...(paymentMethod && { paymentMethod: paymentMethod }),
            ...(startDate && { saleDate: { $gte: new Date(startDate) } }),
            ...(endDate && { saleDate: { $lte: new Date(endDate) } })
        });
        return NextResponse.json({ sales, total: totalSales, totalPages: Math.ceil(totalSales / Number(limit)) }, { status: 200 });
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
        const parsed = salesSchema.partial().safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const sales = await Sales.findOneAndUpdate({ _id: id, companyId: decoded.companyId }, parsed.data, { new: true });
        if (!sales) {
            return NextResponse.json(
                { message: "Sales not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Sales updated successfully", sales }, { status: 200 });
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
        const sales = await Sales.findOneAndDelete({ _id: id, companyId: decoded.companyId });
        if (!sales) {
            return NextResponse.json(
                { message: "Sales not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Sales deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}