"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
    const router = useRouter();
    const params = useSearchParams();

    const token = params.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 text-lg font-medium">
                    Invalid or missing reset token.
                </p>
            </div>
        );
    }

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (!newPassword) {
            setError("Password is required");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid or expired token");
            } else {
                setSuccess("Password updated! Redirecting to login...");
                setTimeout(() => router.push("/auth/login"), 1500);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md border p-6 rounded shadow">
                <h1 className="text-2xl font-semibold mb-6 text-center">Reset Password</h1>

                {error && (
                    <div className="mb-3 p-3 bg-red-100 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-3 p-3 bg-green-100 text-green-700 rounded text-sm">
                        {success}
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-sm mb-1">New Password</label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border rounded p-2 pr-10 outline-none"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </div>
    );
}
