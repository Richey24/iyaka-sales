import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import "@/models/company";
import { loginSchema } from "@/utils/validation";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST (req: Request) {
    // try {
        const body = await req.json();
        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }

        await connectDB();
        const user = await User.findOne({ email: parsed.data.email }).populate('companyId');
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(parsed.data.password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
            companyId: user.companyId,
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
        return NextResponse.json({ message: "Login successful", user: userWithoutPassword }, { status: 200 });
    // } catch (error) {
    //     return NextResponse.json(
    //         { message: "Internal server error", error },
    //         { status: 500 }
    //     );
    // }
}