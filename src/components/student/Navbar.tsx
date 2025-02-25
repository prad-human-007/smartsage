"use client"
import { useState } from "react";
import { DashboardSidebar } from "./sidebar/DashboardSidebar";
export function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <nav className="w-full fixed top-0 left-0 bg-teal-600 text-white p-4 shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <button 
                        className="text-white text-2xl focus:outline-none" 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ≡
                    </button>
                    <h1 className="text-2xl font-bold">Smart Sage</h1>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-200 transition">Home</a></li>
                        <li><a href="#" className="hover:text-gray-200 transition">About</a></li>
                        <li><a href="#" className="hover:text-gray-200 transition">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* Sidebar */}
            <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </>
    );
}