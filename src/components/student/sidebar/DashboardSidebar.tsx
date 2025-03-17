'use client'
export function DashboardSidebar() {
    return (
        <div className={` rounded-xl top-0 left-0 h-full w-[15rem] bg-teal-700 text-white p-4 shadow-lg transform transition-transform duration-300 `}>

            <h2 className="text-2xl mb-4">Maths</h2>
            <ul className="flex-grow overflow-y-auto">
                <li className="mb-2"><a href="/student/dashboard" className="text-xl">Home</a></li>
                <li className="mb-2"><a href="/student/calender" className="text-xl">Calendar</a></li>
                <li className="mb-2"><a href="/student/classes" className="text-xl">Classes</a></li>
                <li className="mb-2"><a href="/student/analysis" className="text-xl">Analysis</a></li>
                <li className="mb-2"><a href="/student/classroom/class_1/chat" className="text-xl">Class 1</a></li>
                <li className="mb-2"><a href="/student/classroom/class_2/chat" className="text-xl">Class 2</a></li>
            </ul>
            <a href="/student/settings" className="text-xl">Settings</a>
        </div>
    );
}