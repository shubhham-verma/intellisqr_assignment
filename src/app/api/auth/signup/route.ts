import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
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
    } catch (error) {
        console.error("Signup error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
