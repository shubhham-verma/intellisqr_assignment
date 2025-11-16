"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">

        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
          Your Todo Manager
        </h1>

        <p className="text-gray-600 mb-12 text-lg max-w-md leading-relaxed">
          Stay organized, boost productivity, and accomplish more every day
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/auth/signup")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Get Started
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            className="px-8 py-3 bg-white text-gray-700 rounded-xl text-base font-medium hover:shadow-md hover:scale-105 transition-all duration-200 border border-gray-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}