import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument } from "pdf-lib";  // For extracting text

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Parse FormData to extract the file
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `documents/${Date.now()}-${file.name}`;

    // 2️⃣ Upload File to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(fileName, fileBuffer, { contentType: file.type });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    // 3️⃣ Get Public URL of Stored File
    const fileUrl = supabase.storage.from("documents").getPublicUrl(fileName).data.publicUrl;

    // 4️⃣ Extract Text from PDF
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const textContent = (await Promise.all(pdfDoc.getPages().map(page => page.getTextContent()))).flat().join(" ");

    // 5️⃣ Chunk Text (each chunk is 1000 characters for Gemini)
    const chunkSize = 1000;
    const chunks = [];
    for (let i = 0; i < textContent.length; i += chunkSize) {
      chunks.push(textContent.substring(i, i + chunkSize));
    }

    // 6️⃣ Insert Document Metadata into `documents` Table
    const { data: docData, error: docError } = await supabase
      .from("documents")
      .insert([{ name: file.name, url: fileUrl, user_id: "USER_ID", class_id: "CLASS_ID" }])
      .select("document_id")
      .single();

    if (docError) {
      console.error(docError);
      return NextResponse.json({ error: "Failed to save document metadata" }, { status: 500 });
    }

    // 7️⃣ Insert Chunks into `document_chunks` Table
    const document_id = docData.document_id;
    const chunkInsertData = chunks.map((chunk, index) => ({
      document_id,
      chunk_text: chunk,
      chunk_index: index,
    }));

    await supabase.from("document_chunks").insert(chunkInsertData);

    return NextResponse.json({ message: "File uploaded and processed successfully", url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
