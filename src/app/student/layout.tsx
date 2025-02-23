import { ReactNode } from "react";

export default function Layout({children} : {children: ReactNode}) {
    return (
        <div className="flex flex-col w-full h-screen items-center p-2 gap-2 lg:gap-4">
            {/* Navbar */}
            <nav className="flex flex-row max-w-[120rem] w-full justify-between border rounded-xl p-4">
                <div className="">SMARTSAGE {' > '} School Name {' > '} Hello Prad!! </div>
                <ul className="flex space-x-4">
                    <li><a href="#" className="">Home</a></li>
                    <li><a href="#" className="">About</a></li>
                    <li><a href="#" className="">Contact</a></li>
                </ul>
            </nav>
            {/* Content */}
            <div className="flex flex-row max-w-[120rem] w-full h-full items-center gap-3 ">
                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}