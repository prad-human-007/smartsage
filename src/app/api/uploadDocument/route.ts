import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/../lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // ✅ Get Authorization token from headers
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
    }

    // ✅ Authenticate user using token
    const { data: userData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !userData?.user?.id) {
      return NextResponse.json({ error: "Unauthorized: Invalid user" }, { status: 401 });
    }

    const userId = userData.user.id;

    // ✅ Ensure class_id is provided
    const classId = new URL(req.url).searchParams.get("class_id");
    if (!classId) {
      return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
    }

    // ✅ Get the file from form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    // ✅ Upload file to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${classId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload Error:", uploadError.message);
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    // ✅ Generate signed URL
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from("documents")
      .createSignedUrl(uploadData.path, 60 * 60);

    if (signedUrlError) {
      console.error("Signed URL Error:", signedUrlError.message);
      return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
    }

    const fileUrl = signedUrlData.signedUrl;

    // ✅ Insert file metadata into database
    const { error: insertError } = await supabase.from("documents").insert([
      {
        file_name: fileName,
        file_url: fileUrl,
        user_id: userId,
        class_id: classId,
      },
    ]);

    if (insertError) {
      console.error("Database Insert Error:", insertError.message);
      return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "File uploaded successfully!", fileUrl }, { status: 200 });

  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
