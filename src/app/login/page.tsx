"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import educationAnimation from "@/animations/login-img.json"; // Ensure the correct file path

const CustomButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full text-lg shadow-md hover:bg-yellow-500 transition-all w-full"
    >
      {text}
    </button>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // Add authentication logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google Sign-In triggered");
    // Add Google authentication logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-7xl text-gray-800 mb-10 text-center">Welcome to Smart Sage</h1>

      {/* Peach Card Covering Almost Entire Width */}
      <div className="bg-[#FFDAB9] p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 w-[95%] mx-auto">
        
        {/* Left Side: Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={educationAnimation} loop={true} className="w-full h-auto" />
        </div>

        {/* Right Side: Login Section */}
        <div className="bg-teal-500 p-6 rounded-2xl shadow-lg w-full md:w-1/2">
          
          {/* White Card Inside Teal Card */}
          <div className="bg-white p-8 rounded-xl shadow-md text-teal-600 text-lg">
            <h2 className="text-3xl font-semibold mb-4 text-center">Login to Your Account</h2>
            <p className="text-lg text-teal-700 text-center">
              Where your classroom experience meets AI.
            </p>

            {/* Email & Password Input Fields */}
            <div className="mt-6 flex flex-col gap-4 w-full max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />

              {/* Login Button */}
              <CustomButton text="Login" onClick={handleLogin} />

              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleLogin}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full text-lg shadow-md hover:bg-red-600 transition-all w-full flex items-center justify-center gap-2"
              >
                
                Sign in with Google
              </button>
            </div>

            {/* Sign Up Option */}
            <p className="mt-6 text-sm text-teal-600 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-teal-700 underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
