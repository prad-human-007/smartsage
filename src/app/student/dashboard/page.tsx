"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import Navbar from "@/components/student/Navbar";

export default function ClassroomDashboard() {
  const router = useRouter();
  const [classList, setClassList] = useState<{ title: string; id: string; image: string }[]>([]);


  useEffect(() => {
    async function fetchImages() {
      const classroomTitles = ["Math", "Science", "History", "English", "Physics"];
  
      const fetchedClassrooms = await Promise.all(
        classroomTitles.map(async (title) => {
          const id = uuidv4().slice(0, 6);
          try {
            const response = await fetch(
              `https://api.unsplash.com/photos/random?query=classroom&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            );
  
            if (!response.ok) {
              console.error(`Unsplash API Error: ${response.statusText}`);
              throw new Error("Unsplash API request failed.");
            }
  
            const data = await response.json();
            return { title, id, image: data?.urls?.small || "/fallback-image.jpg" };
          } catch (error) {
            console.error("Error fetching Unsplash image:", error);
            return { title, id, image: "/fallback-image.jpg" }; // Use fallback image
          }
        })
      );
  
      setClassList(fetchedClassrooms);
    }
  
    fetchImages();
  }, []);
  
  const handleCardClick = (class_id: string) => {
    router.push(`/student/classroom/${class_id}/chat`);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100 overflow-hidden p-6">
      
      {/* Animated Background Bubbles */}
      
      {/* Title */}
      <h1 className="text-5xl font-semibold text-gray-800 mb-10 text-center z-10">Classroom Dashboard</h1>

      {/* Dashboard Card Container */}
      <div className="bg-[#FFDAB9] p-10 rounded-3xl shadow-xl flex flex-col w-[95%] mx-auto">
        
        {/* Inner Teal Section */}
        <div className="bg-teal-500 p-8 rounded-2xl shadow-lg w-full">
          
          {/* White Card Inside Teal Card */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">Your Classrooms</h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {classList.map(({ title, image, id }) => (
                <div
                  key={id}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  onClick={() => handleCardClick(id)}
                >
                  <img src={image} alt={title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-500 text-sm">ID: {id}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
