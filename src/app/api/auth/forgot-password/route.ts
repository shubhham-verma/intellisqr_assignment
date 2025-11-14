import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";
import { createTransporter } from "@/app/lib/mail";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
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
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
        });

        return NextResponse.json({
            message: "Reset email sent",
            preview: nodemailer.getTestMessageUrl(info),
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
