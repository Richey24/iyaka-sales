import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { oldPassword, newPassword } = await req.json();
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
        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid old password" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}