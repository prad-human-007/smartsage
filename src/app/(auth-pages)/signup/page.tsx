"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

// Updated Bubble Config with More Teal & Faster Movement
const bubbles = [
  { size: "w-96 h-96", color: "bg-teal-400/100", duration: 4, xRange: 1200, yRange: 800 },
  { size: "w-80 h-80", color: "bg-orange-400/90", duration: 4.5, xRange: 900, yRange: 600 },
  { size: "w-72 h-72", color: "bg-yellow-500/90", duration: 3.5, xRange: 1000, yRange: 700 },
  { size: "w-96 h-96", color: "bg-teal-500/100", duration: 3.8, xRange: 1100, yRange: 850 },
  { size: "w-64 h-64", color: "bg-orange-300/90", duration: 5, xRange: 950, yRange: 750 },
  { size: "w-60 h-60", color: "bg-yellow-400/90", duration: 3.2, xRange: 1050, yRange: 650 },
  { size: "w-96 h-96", color: "bg-teal-600/100", duration: 4.2, xRange: 1300, yRange: 900 },
];

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="relative flex w-full h-screen justify-center items-center bg-beige overflow-hidden">
      {/* Animated Amoeba Bubbles */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute ${bubble.size} ${bubble.color} rounded-full blur-3xl opacity-95`}
          animate={{
            x: [0, bubble.xRange, -bubble.xRange, 0],
            y: [0, -bubble.yRange, bubble.yRange, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Signup Card */}
      <Card className="relative z-50 p-6 shadow-xl bg-white rounded-xl w-96">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-serif font-bold text-teal-600">Sign Up</h1>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="text-orange-500 font-medium underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col min-w-64 max-w-64 mx-auto">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input name="email" placeholder="you@example.com" required className="border rounded-lg p-2" />

              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input type="password" name="password" placeholder="Your password" minLength={6} required className="border rounded-lg p-2" />

              <Label htmlFor="role" className="text-gray-700">Sign up as</Label>
              <select name="role" required className="border p-2 rounded-lg bg-white">
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>

              <SubmitButton formAction={signUpAction} pendingText="Signing up..." className="!bg-yellow-500 hover:!bg-yellow-600 text-black font-medium p-2 rounded-lg">
                Sign Up
              </SubmitButton>

              <FormMessage message={searchParams} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
