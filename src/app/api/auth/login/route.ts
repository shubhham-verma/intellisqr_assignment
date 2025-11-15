import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";
import { logError } from "@/app/lib/logError";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 200 }
        );

    } catch (error: any) {
        await logError(error, "POST /api/auth/login");
        return NextResponse.json(
            { error: error?.message || "Internal server error" },
            { status: 500 }
        );
    }
}
