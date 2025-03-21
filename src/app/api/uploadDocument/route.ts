import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Extract user from Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;

    // Extract class_id from query params or request body
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("class_id");

    if (!classId) {
      return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
    }

    // Extract file from request
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type (only PDFs allowed)
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Generate Unique File Name
    const fileName = `${Date.now()}-${file.name}`;

    // Upload File to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents") // Supabase Storage bucket name
      .upload(fileName, fileBuffer, { contentType: "application/pdf" });

    if (uploadError) {
      console.error("Upload Error:", uploadError.message);
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    // Insert File Metadata into Supabase Database
    const { error: insertError } = await supabase.from("documents").insert([
      {
        file_name: fileName,
        file_url: uploadData.path,
        user_id: userId,
        class_id: classId,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Database Insert Error:", insertError.message);
      return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "File uploaded successfully!", url: uploadData.path },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
