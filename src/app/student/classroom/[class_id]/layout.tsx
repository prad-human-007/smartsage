import { ClassroomSidebar } from "@/components/student/sidebar/ClassroomSidebar";
import { ReactNode } from "react";

export default function Layout({children, params: {class_id}} : {children: ReactNode, params: {class_id: string}}) {
    return (
        <div className="flex flex-row max-w-[120rem] w-full h-[calc(100vh-90px)] gap-3 ">
         
            <div className="w-full  ">
                {children}
            </div>
        </div>
    
    )
}