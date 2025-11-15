import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";
import { logError } from "@/app/lib/logError";

export async function GET(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) throw new Error("Unauthorized");

        const todos = await Todo.find({ userId: user.userId }).sort({
            createdAt: -1,
        });

        return NextResponse.json({ todos });

    } catch (error: any) {
        await logError(error, "GET /api/todos/list");
        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 400 }
        );
    }
}
