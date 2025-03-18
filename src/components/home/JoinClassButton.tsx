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
export function JoinClass() {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ user, setUser ] = useState<User | null>(null)
  const [ token, setToken ] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [class_id, setClassId] = useState('')
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

  const joinClass = async () => {
    if(!token) {alert("You are not authenticated"); return}
    if(!class_id) {alert("Please fill in all fields"); return}
    const response = await fetch('/api/join-class',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
          class_id: class_id,
        })
      }
    )
    
    const data = await response.json();
    if (response.ok) {
      setOpen(false)
    }
    else {
      console.log(data)
      alert(data)  
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="text-lg">Join Classroom</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="rounded-xl">
          <DialogTitle>Join Classroom</DialogTitle>
          <DialogDescription>
            Enter the Id of the classroom you want to join
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Class Id
            </Label>
            <Input 
            id="name"
            placeholder="I45GF3" 
            className="col-span-3"
            onChange={(e) => setClassId(e.target.value)}
             />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={joinClass} type="submit">Join Class</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
