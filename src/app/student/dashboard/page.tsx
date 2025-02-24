"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // Generate random IDs

const classrooms = ["Mathematics", "Science", "History", "English"];

export default function ClassroomDashboard() {
  const router = useRouter();
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const fetchedClassrooms = await Promise.all(
        classrooms.map(async (title) => {
          const id = uuidv4().slice(0, 6);
          const response = await fetch(
            `https://source.unsplash.com/300x200/?classroom,education,school&sig=${id}`
          );
          return { title, id, image: response.url };
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Classroom Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
