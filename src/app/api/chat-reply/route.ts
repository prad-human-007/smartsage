import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";




export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    if(!body.input) 
        return NextResponse.json({ message: "[Error] No input provided"});

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model  = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
    const result = await model.generateContent(body.input);
    const text = await result.response.text();
    console.log("Response from OpenAI", text);  


    return NextResponse.json({ message: text});
}