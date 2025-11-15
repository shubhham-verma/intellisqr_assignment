import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";
import { createTransporter } from "@/app/lib/mail";
import nodemailer from "nodemailer";
import { logError } from "@/app/lib/logError";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email } = await req.json();

        if (!email) {
            throw new Error("Email required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "If account exists, email will be sent" },
                { status: 200 }
            );
        }

        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

        const transporter = await createTransporter();

        const info = await transporter.sendMail({
            from: "no-reply@example.com",
            to: user.email,
            subject: "Password Reset",
            html: `
                <p>Click the link to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
            `,
        });

        return NextResponse.json({
            message: "Reset email sent",
            preview: nodemailer.getTestMessageUrl(info),
        });

    } catch (error: any) {
        await logError(error, "POST /api/auth/forgot-password");

        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 500 }
        );
    }
}
