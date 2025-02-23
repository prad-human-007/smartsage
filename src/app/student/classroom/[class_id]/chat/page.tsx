'use client'

import { body } from 'framer-motion/client';
import { useState } from 'react';
import Markdown from 'react-markdown'

interface Msg{
    role: 'user' | 'agent'
    text: string;
}

export default function ChatAIPage({ params: { class_id } }: { params: { class_id: string } }) {
    const [messages, setMessages] = useState<Msg[]>([]);
    const [inputText, setInputText] = useState('');

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if(inputText === '') return;
            setMessages((prev) => [...prev, {role: 'user', text: inputText}]);
            setInputText('');

            const response = await fetch('/api/chat-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({input: inputText}),
            })
            const { message } = await response.json();
            console.log("Response from api", message);
            
            if(message)
                setMessages((prev) => [...prev, {role: 'agent', text: message}]);
        }
    };

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="shadow-xl flex flex-row w-full h-full items-center border border-gray-500 rounded-xl">
                <div className="flex flex-col w-full h-full">
                    <h1 className="text-2xl p-4 border-b border-gray-500">Chat for class {class_id}</h1>
                    <div className='flex flex-grow w-full justify-center overflow-y-auto'>
                        <div className="flex-grow max-w-6xl  w-full p-2">
                            {/* Chat messages will be displayed here */}
                            {messages.map((msg, idx) => {
                                return (
                                    <div key={idx} className={`flex py-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-2 max-w-4xl ${msg.role == 'user'? 'border rounded-lg' : ''} `}><Markdown>{msg.text}</Markdown></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                    <div className="w-full p-4 border-t border-gray-500">
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Type your message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}