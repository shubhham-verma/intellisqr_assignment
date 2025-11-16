import { z } from "zod";

export const TodoItem = z.object({
    _id: z.string(),
    title: z.string(),
    completed: z.boolean(),
    createdAt: z.string(),
});

export const TodoListResponse = z.object({
    todos: z.array(
        z.object({
            _id: z.string(),
            title: z.string(),
            completed: z.boolean(),
            createdAt: z.string(),
        })
    )
});


export const CreateTodoSchema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
});

export const UpdateTodoSchema = z.object({
    title: z.string().min(1),
});

