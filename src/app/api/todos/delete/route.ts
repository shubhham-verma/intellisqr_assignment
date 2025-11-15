import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";
import mongoose from "mongoose";
import { logError } from "@/app/lib/logError";

export async function DELETE(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) throw new Error("Unauthorized");

        const { id } = await req.json();
        if (!id) throw new Error("ID is required");

        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error("Invalid ID");

        const deleted = await Todo.findOneAndDelete({
            _id: id,
            userId: user.userId,
        });

        if (!deleted) throw new Error("Todo not found");

        return NextResponse.json({ message: "Todo deleted" });

    } catch (error: any) {
        await logError(error, "DELETE /api/todos/delete");
        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 400 }
        );
    }
}
