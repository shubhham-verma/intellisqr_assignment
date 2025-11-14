import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        await Todo.findOneAndDelete({ _id: id, userId: user.userId });

        return NextResponse.json({ message: "Todo deleted" });
    } catch (error) {
        console.error("Delete Todo error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
