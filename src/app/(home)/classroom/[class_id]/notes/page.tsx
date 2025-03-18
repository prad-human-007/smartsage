import { CreateClass } from "@/components/home/CreateClassButton";

export default function NotesPage() {
    return (
       <div className="flex flex-col w-full h-full items-center border border-gray-500 rounded-xl">
            <CreateClass />
            <h1 className="text-xl italic mt-10">Notes</h1>
        </div>
    )
}