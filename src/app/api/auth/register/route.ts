import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { userSchema } from "@/utils/validation";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    // try {
        const body = await req.json();
        const parsed = userSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }

        await connectDB();
        const existingUser = await User.findOne({ email: parsed.data.email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
        const user = await User.create({ ...parsed.data, password: hashedPassword });
        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        return NextResponse.json({ message: "User created successfully", user: userWithoutPassword }, { status: 201 });
    // } catch (error) {
    //     return NextResponse.json(
    //         { message: "Internal server error", error },
    //         { status: 500 }
    //     );
    // }
}