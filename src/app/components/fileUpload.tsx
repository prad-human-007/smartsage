"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FileUpload({ classId }: { classId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        console.log("🔹 Session Data (FileUpload.tsx):", sessionData);
        if (error) {
          console.error("❌ Error fetching session:", error);
          return;
        }
        if (!sessionData || !sessionData.session) {
          console.error("❌ No active session found in FileUpload.tsx");
          return;
        }
        setSessionToken(sessionData.session.access_token);
      } catch (err) {
        console.error("❌ Error in fetchSession:", err);
      }
    };

    fetchSession();
  }, [supabase]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    if (!sessionToken) {
      setMessage("Unauthorized: No session found. Please log in.");
      console.error("❌ No session token available.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      console.log("🔹 Sending Token:", sessionToken);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/uploadDocument?class_id=${classId}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const result = await response.json();
      console.log("🔹 API Response:", result);

      if (response.ok) {
        setMessage("✅ File uploaded successfully!");
      } else {
        setMessage(`❌ Error: ${result.error}`);
        console.error("❌ Upload error:", result.error);
      }
    } catch (error) {
      console.error("❌ Upload request failed:", error);
      setMessage("❌ Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>
      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </div>
  );
}
