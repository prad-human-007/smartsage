export function DashboardSidebar() {
    return (
        <div className="flex flex-col w-[15rem] h-full border border-gray-500 rounded-xl p-4">
            <h2 className="text-xl mb-4">Navigation</h2>
            <ul className="flex-grow overflow-y-auto">
                <li className="mb-2"><a href="#" className="text-blue-500">Link 1</a></li>
                <li className="mb-2"><a href="#" className="text-blue-500">Link 2</a></li>
                <li className="mb-2"><a href="#" className="text-blue-500">Link 3</a></li>
                {/* Add more links or content here */}
            </ul>
        </div>
    )
}