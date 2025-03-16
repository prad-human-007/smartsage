"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Logging in with:", { email, password });
    router.push("/dashboard"); // Redirect after successful login
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-beige">
      <div className="flex flex-col w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-teal-700 text-center">Sign In</h1>
        <p className="text-sm text-teal-600 text-center mb-4">
          Don&apos;t have an account? <a href="/signup" className="underline text-teal-700">Sign up</a>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-teal-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-teal-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
              placeholder="Your password"
            />
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600">
            Sign in
          </button>
        </form>
        <button className="w-full mt-4 bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}