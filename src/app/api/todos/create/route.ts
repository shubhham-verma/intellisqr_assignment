import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";

export async function POST(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { title } = await req.json();
        if (!title) {
            return NextResponse.json({ error: "Title required" }, { status: 400 });
        }

        const todo = await Todo.create({
            userId: user.userId,
            title,
        });

        return NextResponse.json({ message: "Todo created", todo });
    } catch (error) {
        console.error("Create Todo error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
