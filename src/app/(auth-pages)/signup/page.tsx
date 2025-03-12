"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import educationAnimation from "@/animations/login-img.json"; // Ensure correct path

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

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", email, password);
    // Add sign-up logic here
  };

  const handleGoogleSignup = () => {
    console.log("Google Sign-Up triggered");
    // Add Google authentication logic here
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-[#FFDAB9] p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 w-[95%] max-w-5xl mx-auto">
        
        {/* Left Side: Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie animationData={educationAnimation} loop={true} className="w-full max-w-xs" />
        </div>

        {/* Right Side: Signup Section */}
        <div className="bg-teal-500 p-6 rounded-2xl shadow-lg w-full md:w-1/2">
          
          {/* White Card Inside Teal Card */}
          <div className="bg-white p-8 rounded-xl shadow-md text-teal-600 text-lg">
            <h2 className="text-3xl font-semibold mb-4 text-center">Create an Account</h2>
            <p className="text-lg text-teal-700 text-center">
              Unlock the power of AI in learning.
            </p>

            {/* Input Fields */}
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
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              
              {/* Error Message */}
              {error && <p className="text-red-600 text-sm">{error}</p>}

              {/* Signup Button */}
              <CustomButton text="Sign Up" onClick={handleSignup} />

              {/* Google Sign-Up Button */}
              <button
                onClick={handleGoogleSignup}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full text-lg shadow-md hover:bg-red-600 transition-all w-full flex items-center justify-center gap-2"
              >
                Sign up with Google
              </button>
            </div>

            {/* Login Option */}
            <p className="mt-6 text-sm text-teal-600 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-700 underline font-medium">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
