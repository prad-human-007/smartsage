'use client'

import { Button } from "@/app/components/ui/button";
import { CreateClass } from "../CreateClassButton";
import { JoinClass } from "../JoinClassButton";
import { useAuth } from "@/utils/supabase/auth-context";
export function DashboardSidebar() {
    const {user} = useAuth();
    return (
        <div className={` rounded-xl top-0 left-0 h-full w-[15rem] bg-teal-700 text-white p-4 shadow-lg transform transition-transform duration-300 `}>

            <h2 className="text-2xl mb-4">Hello {user?user.email:"Guest"}</h2>
            <ul className="flex-grow overflow-y-auto">
                <li className="mb-2"><a href="/dashboard" className="text-xl">Home</a></li>
                <li className="mb-2"><a href="/calender" className="text-xl">Calendar</a></li>
                <li className="mb-2"><a href="/analysis" className="text-xl">Analysis</a></li>
            </ul>
            <a href="/settings" className="text-xl">Settings</a>
            <div className="flex flex-col gap-1 mt-2">
                <CreateClass />
                <JoinClass />
            </div>
            
        </div>
    );
}