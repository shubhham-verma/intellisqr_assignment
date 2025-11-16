"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">

        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Todo Manager
        </h1>

        <p className="text-gray-600 mb-8 text-lg max-w-xl">
          Manage your tasks, stay productive, and keep everything organized in one place.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/auth/signup")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
          >
            Sign Up
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg text-lg hover:bg-gray-900"
          >
            Login
          </button>
        </div>
      </div>

      
    </div>
  );
}
