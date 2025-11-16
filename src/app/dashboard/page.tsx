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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your todos...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md text-center">
                    <p className="text-red-600 text-lg font-medium">Error loading todos</p>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        router.push("/auth/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* NAVBAR */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between py-4 px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Welcome back</p>
                            <p className="font-semibold text-gray-900">
                                {localStorage.getItem("userName") || "User"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* CREATE TODO */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="flex gap-3">
                            <input
                                className="flex-1 border text-black border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="What needs to be done?"
                                value={newTodoText}
                                onChange={(e) => setNewTodoText(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && newTodoText.trim()) {
                                        createTodo.mutate({ title: newTodoText.trim() });
                                        setNewTodoText("");
                                    }
                                }}
                            />
                            <button
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
                                onClick={() => {
                                    if (!newTodoText.trim()) return;
                                    createTodo.mutate({ title: newTodoText.trim() });
                                    setNewTodoText("");
                                }}
                                disabled={!newTodoText.trim()}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* TODOS LIST */}
                {todos.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No todos yet</p>
                        <p className="text-gray-400 text-sm mt-1">Add your first task to get started</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todos?.map((todo: { _id: string; title: string; completed: boolean }) => (
                            <div
                                key={todo._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleTodo.mutate(todo._id)}
                                            className="w-5 h-5 rounded text-black border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        />

                                        {editingId === todo._id ? (
                                            <input
                                                className="flex-1 border text-black border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                autoFocus
                                            />
                                        ) : (
                                            <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-700"} font-medium truncate`}>
                                                {todo.title}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {editingId === todo._id ? (
                                            <button
                                                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
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
                                                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                                                onClick={() => {
                                                    setEditingId(todo._id);
                                                    setEditingText(todo.title);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        )}

                                        <button
                                            className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                                            onClick={() => deleteTodo.mutate(todo._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}