import { userSchema } from "@/utils/validation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDB } from "@/lib/db";

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
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { id: string };
        const body = await req.json();
        const parsed = userSchema.partial().safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: z.treeifyError(parsed.error), message: "Invalid request body" },
                { status: 400 }
            );
        }
        await connectDB();
        const user = await User.findByIdAndUpdate(decoded.id, parsed.data, { new: true });
        return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}