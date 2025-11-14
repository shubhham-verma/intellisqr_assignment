import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";

export async function GET(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const todos = await Todo.find({ userId: user.userId }).sort({ createdAt: -1 });

        return NextResponse.json({ todos });
    } catch (error) {
        console.error("List Todos error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
