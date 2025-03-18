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
    const {name, description } = await request.json();
    console.log("class name:", name, "description:", description, "user:", user.id);
    
    const code = uuidv4().slice(0, 6);
    const {data, error } = await supabase.from('classrooms').insert([{
        name: name,
        description: description,
        code: code,
        instructor_id: user.id
    }])
    console.log("Classroom created", data);
    if(error) {
        console.error("Failed to create classroom", error);
        return NextResponse.json("Failed to create classroom", { status: 500 });
    }

    const response = await supabase.from('class_members').insert([{
        class_id: code,
        member_id: user.id
    }])

    if(response.error) {
        console.error("Failed to create classroom", response.error);
        return NextResponse.json("Failed to create classroom", { status: 500 });
    }

    return NextResponse.json({class_id: ''}, { status: 200 });
}