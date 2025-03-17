"use client";
import { useRouter } from "next/navigation"; 
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/animations/login-img.json"; // Ensure the correct file path

const CustomButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
 
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full text-lg shadow-md hover:bg-yellow-500 transition-all"
    >
      {text}
    </button>
  );
};

export default function LandingPage() {

  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-7xl text-gray-800 mb-10 text-center">Welcome to Smart Sage</h1>

      {/* Peach Card Covering Almost Entire Width */}
      <div className="bg-[#FFDAB9] p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 w-[95%] mx-auto">
        
        {/* Teal Card Nesting the White Card */}
        <div className="bg-teal-500 p-6 rounded-2xl shadow-lg w-full md:w-1/2">
          
          {/* White Card */}
          <div className="bg-white p-8 rounded-xl shadow-md text-teal-600 text-lg">
            <h2 className="text-3xl font-semibold mb-4">Smart Learning, Smarter Future</h2>
            <p className="readex-pro text-lg text-teal-700">
              Step into the future of education with Smart Sage—where AI meets the classroom!
              Empower students to grow and help teachers unlock their full potential with intelligent support.
            </p>

            {/* Login Section Inside the White Card */}
            <div className="mt-8 text-center">
              <h2 className="text-2xl text-gray-800 mb-4">Try it today!</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <CustomButton text="Login as Student" onClick={() => router.push("/login")} />
                <CustomButton text="Login as Teacher" onClick={() => router.push("/login")} />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={animationData} loop={true} className="w-full h-auto" />
        </div>

      </div>
    </div>
  );
}
