"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/utils/supabase/auth-context";
import { createClient } from "@/utils/supabase/client";

export default function ClassroomDashboard() {
  const router = useRouter();
  const [classList, setClassList] = useState<{ title: string; id: string; image: string }[]>([]);
  const {user, token, isAuthenticated, loading} = useAuth()


  useEffect(() => {
    if(loading || !user) return

    console.log("User", user);

    const fetchUserClasses = async () => {
      const supabase = createClient();
  
      const { data, error } = await supabase
        .from("class_members")
        .select("class_id, classrooms(name)")
        .eq("member_id", user.id);
  
      if (error) {
        console.error("Error fetching classes:", error);
        return;
      }
      
      console.log("Fetched Classes", data);
      const fetchedClassrooms = data.map((entry) =>{
        return { title: entry.classrooms.name, id: entry.class_id, image: "/error.jpg" };
      });
  
      setClassList(fetchedClassrooms);
    };
    fetchUserClasses();
    
    // const classroomTitles = ["Math", "Science", "History", "English", "Physics"];
    // const fetchedClassrooms = classroomTitles.map((title) => {
    //   const id = uuidv4().slice(0, 6);
    //   return { title, id, image: "/error.jpg" };
    // });
    // setClassList(fetchedClassrooms);


  }, [loading, user]);

  const handleCardClick = (class_id: string) => {
    router.push(`/classroom/${class_id}/chat`);
  };

  return (
    <div className=" flex flex-col items-center min-h-screen overflow-hidden">
      
      {/* Dashboard Card Container */}
      <div className="bg-[#FFDAB9] p-10 rounded-3xl shadow-xl flex flex-col w-full mx-auto">
        
        {/* Inner Teal Section */}
        <div className="bg-teal-500 p-8 rounded-2xl shadow-lg w-full">
          
          {/* White Card Inside Teal Card */}
          <div className="bg-white p-8 rounded-xl shadow-md overflow-y-auto">
            <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">Your Classrooms</h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
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