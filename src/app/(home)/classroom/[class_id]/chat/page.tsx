'use client'

import { useState } from 'react';
import { MessageList, Msg } from '@/components/chat/MessageList';

export default function ChatAIPage({ params: { class_id } }: { params: { class_id: string } }) {
    const [messages, setMessages] = useState<Msg[]>([]);
    const [inputText, setInputText] = useState('');

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if(inputText === '') return;
            setMessages([...messages, {role: 'user', parts: [{text: inputText}]}]);
            setInputText('');

            const response = await fetch('/api/chat-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({chat_history: { history: messages }, input: inputText}),
            })
            const { message } = await response.json();
            console.log("Response from api", message);
            
            if(message)
                setMessages((prev) => [...prev, {role: 'model', parts: [{text: message}] }]);
        }
    };

    return (
        <div className="flex flex-col w-full h-full items-center border border-gray-500 rounded-xl">
            <h1 className="text-2xl w-full p-4 border-b border-gray-500">Chat for class {class_id}</h1>
            <div className='flex flex-grow  w-full justify-center overflow-y-auto'>
                <MessageList messages={messages}/>
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
    );
}