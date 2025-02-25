export function DashboardSidebar({ isOpen, setIsOpen }) {
    return (
        <div className={`fixed top-0 left-0 h-full w-[15rem] bg-teal-700 text-white p-4 shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
            <button 
                className="text-white text-2xl mb-4 focus:outline-none" 
                onClick={() => setIsOpen(false)}
            >
                ✕
            </button>
            <h2 className="text-2xl mb-4">Maths</h2>
            <ul className="flex-grow overflow-y-auto">
                <li className="mb-2"><a href="/student/dashboard" className="text-xl">Home</a></li>
                <li className="mb-2"><a href="/" className="text-xl">Calendar</a></li>
                <li className="mb-2"><a href="/" className="text-xl">Classes</a></li>
                <li className="mb-2"><a href="/" className="text-xl">Analysis</a></li>
                <li className="mb-2"><a href="/student/classroom/class_1/chat" className="text-xl">Class 1</a></li>
                <li className="mb-2"><a href="/student/classroom/class_2/chat" className="text-xl">Class 2</a></li>
            </ul>
            <a href="/student/settings" className="text-xl">Settings</a>
        </div>
    );
}