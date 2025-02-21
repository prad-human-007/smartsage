import { createClient } from "@/utils/supabase/server";


export default async function Home() {

  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>Hello {user?.email}</div>
      <a href="/sign-in">Sign In</a>
      <a href="/sign-up">Sign Up</a>
    </div>  
    );
}
