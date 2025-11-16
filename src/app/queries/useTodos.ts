import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoListResponse, CreateTodoSchema, UpdateTodoSchema } from "@/app/schemas/todos";
import { authedFetch } from "@/app/lib/authedFetch";

export function useTodos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const res = await authedFetch("/api/todos/list");
            const data = await res.json();

            const parsed = TodoListResponse.safeParse(data);
            if (!parsed.success) {
                console.error(parsed.error.format());
                throw new Error("Invalid server response");
            }

            // return the array only
            return parsed.data.todos;
        },
        retry: false,
    });
}


export function useCreateTodo() {
    const q = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const parsed = CreateTodoSchema.safeParse(body);
            if (!parsed.success) throw new Error("Invalid input");

            const res = await authedFetch("/api/todos/create", {
                method: "POST",
                body: JSON.stringify(parsed.data),
            });

            return res.json();
        },
        onSuccess: () => q.invalidateQueries({ queryKey: ["todos"] }),
    });
}


export function useToggleTodo() {
    const q = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await authedFetch(`/api/todos/toggle`, {
                method: "PUT",
                body: JSON.stringify({ "id": id }),
            });

            return res.json();
        },
        onSuccess: () => q.invalidateQueries({ queryKey: ["todos"] }),
    });
}

export function useUpdateTodo() {
    const q = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const parsed = UpdateTodoSchema.safeParse(data);
            if (!parsed.success) throw new Error("Invalid input");

            const res = await authedFetch(`/api/todos/update`, {
                method: "PUT",
                body: JSON.stringify({ id, title: parsed.data.title }),
            });

            return res.json();
        },
        onSuccess: () => q.invalidateQueries({ queryKey: ["todos"] }),
    });
}


export function useDeleteTodo() {
    const q = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await authedFetch(`/api/todos/delete`, {
                method: "DELETE",
                body: JSON.stringify({ "id": id })
            });

            return res.json();
        },
        onSuccess: () => q.invalidateQueries({ queryKey: ["todos"] }),
    });
}

