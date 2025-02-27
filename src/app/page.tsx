"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "@/animations/login-img.json"; // Ensure the correct file path

const CustomButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-teal-500 text-white rounded-full text-lg  shadow-lg hover:bg-teal-600 transition-all"
    >
      {text}
    </button>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-7xl text-gray-800 mb-10 text-center ">
        Welcome to Smart Sage
      </h1>

      {/* Peach Card Covering Almost Entire Width */}
      <div className="bg-[#FFDAB9] p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 w-[95%] mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md text-teal-600 text-lg  w-full md:w-1/2">
          <h2 className="text-3xl  mb-4">Smart Learning</h2>
          <p >
            Smart Sage revolutionizes learning, where classroom meets AI.
            A place for students to grow and for teachers to unlock students' full potential with AI support.
          </p>
        </div>

        {/* Right Side: Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={animationData} loop={true} className="w-full h-auto" />
        </div>
      </div>

      {/* Login Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl text-gray-800">Try it today!</h2>
        <div className="flex gap-6 mt-6">
          <CustomButton text="Login as Student" onClick={() => alert("Student Login")} />
          <CustomButton text="Login as Teacher" onClick={() => alert("Teacher Login")} />
        </div>
      </div>
    </div>
  );
}
