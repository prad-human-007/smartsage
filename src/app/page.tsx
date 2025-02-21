import { createClient } from "@/utils/supabase/server";
import { SignInButton, SignUpButton, SignOutButton } from "@/components/auth/auth-buttons";

export default async function Home() {

  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-3">
      <div className="text-xl">Hello {user?.email}!!</div>
      <div className="flex gap-3">
      <SignInButton />
      <SignUpButton />
      <SignOutButton />
      </div>
      
    </div>  
    );
}
