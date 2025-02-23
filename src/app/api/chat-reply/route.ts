import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";




export async function POST(request: Request) {
    const {chat_history, input} = await request.json();
    console.log("chat history:", chat_history, "input:", input);
    if(!chat_history || !input) 
        return NextResponse.json({ message: "[Error] No input provided"});

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model  = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
    const chat = model.startChat(chat_history)
    // const result = await model.generateContent(body.input);
    const result = await chat.sendMessage(input)
    const text = await result.response.text();
    console.log("Response from OpenAI", text);  


    return NextResponse.json({ message: text});
}