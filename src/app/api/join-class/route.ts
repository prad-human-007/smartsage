import { NextResponse } from "next/server";
import { createClient, User } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);
let user: User | null  = null;

async function isAuthenticated(req: Request): Promise<boolean> {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return false;
    }
  
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data || data.user.role != 'authenticated') {
      console.error('Failed to authenticate user: ', token, "Error: ", error);  
      return false;
    }
    user = data.user;
    return true;
    
}


export async function POST(request: Request) {
    if(!await isAuthenticated(request) || !user) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    const {class_id } = await request.json();
    console.log("class name:", class_id, "user:", user.id);
    
    const {data, error } = await supabase.from('class_members').insert([{
        class_id: class_id,
        member_id: user.id
    }])
    console.log("Classroom created", data);
    if(error) {
        console.error("Failed to create classroom", error);
        if(error.code == '23503') {
            return NextResponse.json(`No Class with ID ${class_id}`, { status: 400 });
        }
        return NextResponse.json("Error in Database", { status: 500 });
    }
    return NextResponse.json({message: 'success'}, { status: 200 });
}