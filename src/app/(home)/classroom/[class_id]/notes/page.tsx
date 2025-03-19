"use client"
import { useState } from "react";
import { CreateClass } from "@/components/home/CreateClassButton";

export default function NotesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/uploadDocument", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully!");
      } else {
        setMessage("Failed to upload file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center border border-gray-500 rounded-xl p-4">
      <CreateClass />
      <h1 className="text-xl italic mt-10">Notes</h1>

      {/* Upload Document Section */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
        {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
      </div>
    </div>
  );
}
