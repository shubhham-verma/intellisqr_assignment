import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";
import { logError } from "@/app/lib/logError";

export async function POST(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) throw new Error("Unauthorized");

        const { title } = await req.json();
        if (!title) throw new Error("Title is required");

        const todo = await Todo.create({
            userId: user.userId,
            title,
        });

        return NextResponse.json(
            { message: "Todo created", todo },
            { status: 201 }
        );

    } catch (error: any) {
        await logError(error, "POST /api/todos");
        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 400 }
        );
    }
}
