'use client'

import { Button } from "@/components/ui/button";
import { CreateClass } from "../CreateClassButton";

export function DashboardSidebar() {
    return (
        <div className={` rounded-xl top-0 left-0 h-full w-[15rem] bg-teal-700 text-white p-4 shadow-lg transform transition-transform duration-300 `}>

            <h2 className="text-2xl mb-4">Maths</h2>
            <ul className="flex-grow overflow-y-auto">
                <li className="mb-2"><a href="/dashboard" className="text-xl">Home</a></li>
                <li className="mb-2"><a href="/calender" className="text-xl">Calendar</a></li>
                <li className="mb-2"><a href="/analysis" className="text-xl">Analysis</a></li>
            </ul>
            <CreateClass />
            <a href="/settings" className="text-xl">Settings</a>
        </div>
    );
}