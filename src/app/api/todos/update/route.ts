import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Todo from "@/models/Todo";
import { verifyToken } from "@/app/lib/todos-auth";
import mongoose from "mongoose";
import { logError } from "@/app/lib/logError";

export async function PUT(req: Request) {
    try {
        await connectDB();

        const user = verifyToken(req);
        if (!user) throw new Error("Unauthorized");

        const { id, title } = await req.json();
        if (!id || !title) throw new Error("ID and title are required");

        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error("Invalid ID");

        const updated = await Todo.findOneAndUpdate(
            { _id: id, userId: user.userId },
            { title },
            { new: true }
        );

        if (!updated) throw new Error("Todo not found");

        return NextResponse.json({
            message: "Todo updated",
            todo: updated,
        });

    } catch (error: any) {
        await logError(error, "PUT /api/todos/update");
        return NextResponse.json(
            { error: error?.message || "Server error" },
            { status: 400 }
        );
    }
}
