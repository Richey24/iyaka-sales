import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        if (!decoded) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 400 }
            );
        }
        await connectDB();
        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        if (!password) {
            return NextResponse.json(
                { message: "Password is required" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
        return NextResponse.json(
            { message: "Password reset successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}