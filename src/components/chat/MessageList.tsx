import Markdown from "react-markdown";
export interface Msg{
    role: 'user' | 'model'
    parts: {text: string}[];
}

export function MessageList({messages}: {messages: Msg[]}) {
    return (
        <div className="max-w-6xl w-full p-2">
            {/* Chat messages will be displayed here */}
            {messages.map((msg, idx) => {
                return (
                    <div key={idx} className={`flex flex-col w-full  py-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`p-2 max-w-5xl ${msg.role == 'user'? 'border rounded-lg ' : ''} `}><Markdown>{msg.parts[0].text}</Markdown></div>
                    </div>
                )
            })}
        </div>
    )

}