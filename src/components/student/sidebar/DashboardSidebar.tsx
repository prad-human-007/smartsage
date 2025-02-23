export function DashboardSidebar() {

    return (
        <div className="flex flex-col justify-between w-[15rem] h-full border border-gray-500 rounded-xl p-4">
            <div>
                <h2 className="text-2xl mb-4 "> Maths </h2>
                <ul className="flex-grow overflow-y-auto">
                    <li className="mb-2"><a href="/student/dashboard" className="text-xl mb-4">Home</a></li>
                    <li className="mb-2"><a href="/" className="text-xl mb-4">Calender</a></li>
                    <li className="mb-2"><a href="/" className="text-xl mb-4">Classes</a></li>
                    <li className="mb-2"><a href="/" className="text-xl mb-4">Analysis</a></li>
                    <li className="mb-2"><a href="/student/classroom/class_1/chat" className="text-xl mb-4">Class 1</a></li>
                    <li className="mb-2"><a href="/student/classroom/class_2/chat" className="text-xl mb-4">Class 2</a></li>
                    {/* Add more links or content here */}
                </ul>
            </div>
            <a href="/student/settings" className="text-xl">Settings</a>    
        </div>
    )
}