import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return NextResponse.json({ message: "Logged out" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to logout", error: error }, { status: 500 });
    }
}