import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";
import { logError } from "@/app/lib/logError";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();

        // Throw instead of returning early
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: "Signup successful" },
            { status: 201 }
        );

    } catch (error: any) {
        await logError(error, "POST /api/auth/signup");

        return NextResponse.json(
            { error: error?.message || "Internal server error" },
            { status: 500 }
        );
    }
}
