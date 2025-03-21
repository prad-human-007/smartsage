"use client";
import { useParams } from "next/navigation";
import FileUpload from "@/app/components/fileUpload";

export default function NotesPage() {
  const params = useParams();
  const classId = params.class_id; // ✅ Get class_id from dynamic route

  if (!classId) {
    return <p className="text-red-500">Class ID is missing!</p>;
  }

  return (
    <div className="flex flex-col w-full h-full items-center border border-gray-500 rounded-xl p-4">
      <h1 className="text-xl italic mt-10">Notes</h1>
      <FileUpload classId={classId} />
    </div>
  );
}
