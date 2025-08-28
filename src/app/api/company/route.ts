import { Company } from "@/models/company";
import { User } from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { companySchema } from "@/utils/validation";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { id: string };
        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        await connectDB();
        const existingCompany = await Company.findOne({ userId: user._id });
        if (existingCompany) {
            return NextResponse.json(
                { message: "Company already exists" },
                { status: 400 }
            );
        }
        const parsed = companySchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        const company = await Company.create({ ...parsed.data, userId: user._id });
        await User.findByIdAndUpdate(user._id, { companyId: company._id });
        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}

export async function GET() {
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
        await connectDB();
        const company = await Company.findById(decoded.companyId);
        if (!company) {
            return NextResponse.json(
                { message: "Company not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        const parsed = companySchema.partial().safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const company = await Company.findByIdAndUpdate(decoded.companyId, parsed.data, { new: true });
        if (!company) {
            return NextResponse.json(
                { message: "Company not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}