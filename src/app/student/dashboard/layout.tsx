import { DashboardSidebar } from "@/components/student/sidebar/DashboardSidebar";
import { ReactNode } from "react";

export default function Layout({children } : {children: ReactNode}) {
    return (
        <div className="flex flex-row max-w-[120rem] w-full h-full items-center gap-3 ">
            <DashboardSidebar/>
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    
    )
}