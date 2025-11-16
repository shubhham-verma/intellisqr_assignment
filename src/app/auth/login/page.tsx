"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            // console.log(data.user.name);

            if (!res.ok) {
                setError(data.error || "Login failed");
            } else {
                setSuccess("Login successful");

                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.user.name);

                setTimeout(() => {
                    router.push("/dashboard");
                }, 800);
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md border p-6 rounded-lg shadow">
                <h1 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h1>

                {error && (
                    <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">
                        {success}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded p-2 outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-1">Password</label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border rounded p-2 pr-10 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-sm text-center">
                    Forgot your password?{" "}
                    <a href="/auth/reset-password" className="text-blue-600 hover:underline">
                        Reset
                    </a>
                </p>

                <p className="mt-2 text-sm text-center">
                    Don't have an account?{" "}
                    <a href="/auth/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
