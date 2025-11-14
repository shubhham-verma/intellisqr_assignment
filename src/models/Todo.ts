import mongoose, { Schema, models, model } from "mongoose";

const todoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
