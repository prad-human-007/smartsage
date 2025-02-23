import { ReactNode } from "react";

export default function Layout({children} : {children: ReactNode}) {
    return (
        <div className="flex flex-col w-full h-screen items-center p-2 gap-2 lg:gap-4">
            {/* Navbar */}
            <nav className="flex flex-row max-w-[120rem] w-full justify-between border rounded-xl p-4">
                <div className="">My App</div>
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
            </nav>
            {/* Content */}
            <div className="flex flex-row max-w-[120rem] w-full h-full items-center gap-3 ">
                {/* Sidebar */}
                <div className="flex flex-col w-[15rem] h-full border border-gray-500 rounded-xl p-4">
                    <h2 className="text-xl mb-4">Navigation</h2>
                    <ul className="flex-grow overflow-y-auto">
                        <li className="mb-2"><a href="#" className="text-blue-500">Link 1</a></li>
                        <li className="mb-2"><a href="#" className="text-blue-500">Link 2</a></li>
                        <li className="mb-2"><a href="#" className="text-blue-500">Link 3</a></li>
                        {/* Add more links or content here */}
                    </ul>
                </div>
                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}