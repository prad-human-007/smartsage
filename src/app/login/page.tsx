"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import educationAnimation from "@/animations/login-img.json"; // Add an appropriate Lottie animation
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full">
      {/* Left: Animated Illustration */}
      <div className="hidden lg:flex w-1/2 bg-beige justify-center items-center p-8">
        <Lottie animationData={educationAnimation} className="w-3/4 h-auto" />
      </div>

      {/* Right: Login Options */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-white text-teal-600">
        <h1 className="text-4xl font-serif font-bold text-teal-700">
          Welcome to Smart Sage!
        </h1>
        <p className="mt-2 text-lg text-center text-teal-600">
          Where your classroom experience meets AI
        </p>

        <div className="mt-6 flex flex-col gap-4 w-full max-w-sm">
          <Link href="/student/login">
            <Button className="w-full !bg-yellow-500 hover:!bg-yellow-600 text-black">
              Login as Student
            </Button>
          </Link>

          <Link href="/teacher/login">
            <Button className="w-full !bg-yellow-500 hover:!bg-yellow-600 text-black">
              Login as Teacher
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-teal-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-teal-700 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
