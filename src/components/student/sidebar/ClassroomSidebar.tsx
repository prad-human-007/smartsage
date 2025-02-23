export function ClassroomSidebar({class_id}: {class_id: string}) {
    console.log(class_id)
    return (
        <div className="flex flex-col justify-between w-[15rem] h-full border border-gray-500 rounded-xl p-4">
            <div>
                <h2 className="text-2xl mb-4 "> Maths </h2>
                <ul className="flex-grow overflow-y-auto">
                <li className="mb-2"><a href="/student/dashboard" className="text-xl mb-4">Home</a></li>
                    <li className="mb-2"><a href={`/student/classroom/${class_id}/chat`} className="text-xl mb-4">Ollie AI</a></li>
                    <li className="mb-2"><a href={`/student/classroom/${class_id}/notes`} className="text-xl mb-4">Notes</a></li>
                    <li className="mb-2"><a href={`/student/classroom/${class_id}/notes`} className="text-xl mb-4">Group Chat</a></li>
                    <li className="mb-2"><a href={`/student/classroom/${class_id}/notes`} className="text-xl mb-4">Quiz</a></li>
                    {/* Add more links or content here */}
                </ul>
            </div>
            <a href="/student/settings" className="text-xl">Settings</a>    
        </div>
    )
}