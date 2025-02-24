import { ReactNode } from "react";
import { Navbar } from "@/components/student/Navbar";

export default function Layout({children} : {children: ReactNode}) {
    return (
        <div className="flex flex-col items-center w-full h-screen p-2 gap-2 lg:gap-4">
            <Navbar />
            {children}          
        </div>
    )
}