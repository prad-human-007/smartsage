import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Replace with your Gemini API key

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ Upload file to Supabase Storage
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `documents/${Date.now()}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(fileName, fileBuffer, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    // ✅ Get public URL of file
    const fileUrl = supabase.storage.from("documents").getPublicUrl(fileName).data.publicUrl;

    // ✅ Send to Gemini for Processing
    const geminiResponse = await fetch(`https://api.gemini.com/process`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileUrl }),
    });

    if (!geminiResponse.ok) {
      return NextResponse.json({ error: "Gemini processing failed" }, { status: 500 });
    }

    const geminiData = await geminiResponse.json();

    return NextResponse.json({ message: "Processed by Gemini", data: geminiData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
