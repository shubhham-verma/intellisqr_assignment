import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";
import { logError } from "@/app/lib/logError";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            throw new Error("Token and new password are required");
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch {
            throw new Error("Invalid or expired token");
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error("Invalid or expired token");
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        user.password = hashed;
        await user.save();

        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );

    } catch (error: any) {
        await logError(error, "POST /api/auth/reset-password");
        return NextResponse.json(
            { error: error?.message || "Invalid or expired token" },
            { status: 400 }
        );
    }
}
