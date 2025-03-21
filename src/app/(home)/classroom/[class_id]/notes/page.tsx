"use client";
import { useSearchParams } from "next/navigation";
import FileUpload from "@/components/fileUpload";

export default function NotesPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("class_id");

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
