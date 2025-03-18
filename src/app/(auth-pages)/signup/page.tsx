'use client'

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import educationAnimation from "@/animations/login-img.json"; // Ensure the correct file path
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signUpAction, signInwithOAuthAction } from "@/app/actions";
import { Button } from "@/components/ui/button";


export default function SignUpPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "";

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-7xl text-gray-800 mb-10 text-center">Welcome to Smart Sage</h1>

      {/* Peach Card Covering Almost Entire Width */}
      <div className="bg-[#FFDAB9] p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 w-[95%] mx-auto">
        
        {/* Left Side: Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={educationAnimation} loop={true} className="w-full h-auto" />
        </div>

        {/* Right Side: Login Section */}
        <div className="flex bg-teal-500 p-6 rounded-2xl shadow-lg  items-center justify-center">
          
          {/* White Card Inside Teal Card */}
          <div className="bg-white p-8 rounded-xl shadow-md text-teal-600 text-lg max-w-lg ">
            <h2 className="text-3xl font-semibold mb-4 text-center">Sign up to Your Account</h2>
            <p className="text-lg text-teal-700 text-center">
              Where your classroom experience meets AI.
            </p>
            <form className="flex-1 flex flex-col min-w-64">
                <div className="flex flex-col gap-2 [&>input]:mb-3">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    className="rounded-xl"
                    name="email" placeholder="you@example.com" required />
                    <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        className="text-xs text-foreground underline"
                        href="/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                    </div>
                    <Input
                    className="rounded-xl"
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                    />
                    <SubmitButton 
                    className="border border-gray-200 rounded-xl"
                    pendingText="Signing In..." formAction={signUpAction}>
                    Sign Up
                    </SubmitButton>
                    <FormMessage message={message} />
                </div>
                </form>
                <form>
                    <Button 
                      className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full text-lg shadow-md hover:bg-yellow-500 transition-all w-full"
                      formAction={signInwithOAuthAction} >Sign in with Google</Button>
                </form>
          </div>

        </div>
      </div>
    </div>
  );
}
