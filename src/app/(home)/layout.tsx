import { ReactNode } from "react";

export default function Layout({children} : {children: ReactNode}) {
    return (
        <div className="flex flex-col items-center w-full h-screen gap-2 lg:gap-4">
            {children}          
        </div>
    )
}