import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/models/user";
import "@/models/company";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";

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
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { id: string };
        await connectDB();
        const user = await User.findById(decoded.id).populate('companyId').select('-password');
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}