"use client";

import { useState } from "react";
import { useTodos, useToggleTodo, useDeleteTodo, useUpdateTodo, useCreateTodo } from "@/app/queries/useTodos";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    const { data, isLoading, isError } = useTodos();
    const todos = data ?? [];

    const toggleTodo = useToggleTodo();
    const deleteTodo = useDeleteTodo();
    const updateTodo = useUpdateTodo();
    const createTodo = useCreateTodo();

    const [newTodoText, setNewTodoText] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState("");

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading todos</p>;

    const handleLogout = () => {
        // logout();
        router.push("/auth/login");
    };

    return (
        <>
            {/* {NAVBAR} */}
            <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between py-3 px-4">

                    <div className="font-medium text-lg text-black">
                        Hello, {localStorage.getItem("userName") || "User"}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-xl mx-auto mt-10">

                {/* CREATE TODO */}
                <div className="flex gap-2 mb-6">
                    <input
                        className="flex-1 border rounded p-2"
                        placeholder="Create new todo..."
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={() => {
                            if (!newTodoText.trim()) return;
                            createTodo.mutate({ title: newTodoText.trim() });
                            setNewTodoText("");
                        }}
                        
                    >
                        Add
                    </button>
                </div>



                {/* TODOS LIST */}
                <ul className="space-y-3">
                    {todos?.map((todo: { _id: string; title: string; completed: boolean }) => (
                        <li
                            key={todo._id}
                            className="flex items-center justify-between border p-3 rounded"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo.mutate(todo._id)}
                                />

                                {editingId === todo._id ? (
                                    <input
                                        className="border rounded p-1"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                    />
                                ) : (
                                    <span className={todo.completed ? "line-through text-gray-500" : ""}>
                                        {todo.title}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {editingId === todo._id ? (
                                    <button
                                        className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                                        onClick={() => {
                                            updateTodo.mutate({
                                                id: todo._id,
                                                data: { title: editingText },
                                            });
                                            setEditingId(null);
                                        }}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
                                        onClick={() => {
                                            setEditingId(todo._id);
                                            setEditingText(todo.title);
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                                    onClick={() => deleteTodo.mutate(todo._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>


            </div>
        </>
    );
}
