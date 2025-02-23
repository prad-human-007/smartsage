export default function ChatAIPage({params: {class_id}}: {params: {class_id: string}}) {
    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="shadow-xl flex flex-row w-full h-full items-center border border-gray-500 rounded-xl">
                <div className="flex flex-col w-1/4 h-full border-r border-gray-500 p-4">
                    <h2 className="text-xl mb-4">Classroom {class_id}</h2>
                    <ul className="flex-grow overflow-y-auto">
                        <li className="mb-2"><a href="#" className="text-blue-500">Link 1</a></li>
                        <li className="mb-2"><a href="#" className="text-blue-500">Link 2</a></li>
                        <li className="mb-2"><a href="#" className="text-blue-500">Link 3</a></li>
                        {/* Add more links or content here */}
                    </ul>
                </div>
                <div className="flex flex-col w-full h-full">
                    <h1 className="text-2xl p-4 border-b border-gray-500">Chat</h1>
                    <div className="flex-grow overflow-y-auto w-full p-4">
                        {/* Chat messages will be displayed here */}
                    </div>
                    <div className="w-full p-4 border-t border-gray-500">
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Type your message..."
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}