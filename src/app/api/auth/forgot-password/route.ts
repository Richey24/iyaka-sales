import { NextResponse } from "next/server";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/email";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        const resetPasswordUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
        const emailBody = `
            <p>Hello ${user.firstName},</p>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetPasswordUrl}">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,</p>
            <p>The Team</p>
        `;

        await sendEmail(email, "Password Reset Request", emailBody);
        return NextResponse.json(
            { message: "Password reset email sent" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}