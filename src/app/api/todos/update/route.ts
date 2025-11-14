import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";
import mongoose from "mongoose";

export async function PUT(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id, title } = await req.json();

        if (!id || !title) {
            return NextResponse.json({ error: "ID and title required" }, { status: 400 });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const updated = await Todo.findOneAndUpdate(
            { _id: id, userId: user.userId },
            { title },
            { new: true }
        );

        return NextResponse.json({ message: "Todo updated", todo: updated });
    } catch (error) {
        console.error("Update Todo error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
