'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function CreateClass() {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ user, setUser ] = useState<User | null>(null)
  const [ token, setToken ] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  // supabase user initialization
  useEffect(() => {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: {session } , error }) => {
          if (error || !session?.user) {
          router.replace("/sign-in"); 
          } else {
          setUser(session.user)
          setToken(session.access_token)
          setIsAuthenticated(true)
          }
      });
      
  }, []);

  const createClass = async () => {
    if(!token) {alert("You are not authenticated"); return}
    if(!name || !description) {alert("Please fill in all fields"); return}
    const response = await fetch('/api/create-class',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
          name: name,
          description: description
        })
      }
    )
    const data = await response.json()
    console.log("Class Created", data)
    if (response.ok) {
      setOpen(false)
    }
    else {
      alert("Failed to create class}")  
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Create Classroom</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="rounded-xl">
          <DialogTitle>Create Classroom</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Class Name
            </Label>
            <Input 
            id="name"
            placeholder="Physics" 
            className="col-span-3"
            onChange={(e) => setName(e.target.value)}
             />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input 
            id="username" 
            placeholder="Physics Class for 8th grade" 
            className="col-span-3" 
            onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={createClass} type="submit">Create Class</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
