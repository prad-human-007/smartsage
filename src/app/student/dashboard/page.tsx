"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const bubbles = [
  { size: "w-96 h-96", color: "bg-yellow-500/90", duration: 12, xRange: 150, yRange: 100 },
  { size: "w-80 h-80", color: "bg-teal-400/90", duration: 15, xRange: 120, yRange: 80 },
  { size: "w-96 h-96", color: "bg-yellow-500/90", duration: 14, xRange: 180, yRange: 110 },
  { size: "w-64 h-64", color: "bg-teal-300/90", duration: 16, xRange: 140, yRange: 90 },
  { size: "w-96 h-96", color: "bg-teal-600/100", duration: 13, xRange: 160, yRange: 120 },
];

export default function ClassroomDashboard() {
  const router = useRouter();
  const [classList, setClassList] = useState([]);

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
  
  const handleCardClick = (class_id) => {
    router.push(`/student/classroom/${class_id}/chat`);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-beige overflow-hidden">
      {/* Animated Background Bubbles */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute ${bubble.size} ${bubble.color} rounded-full blur-3xl opacity-70`}
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
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
        />
      ))}

      <h1 className="text-3xl font-bold mt-10 mb-6 text-center z-10">Classroom Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
        {classList.map(({ title, image, id }) => (
          <div
            key={id}
            className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300"
            onClick={() => handleCardClick(id)}
          >
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-500 text-sm">ID: {id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
