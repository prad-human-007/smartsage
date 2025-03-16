import { forgotPasswordAction } from "@/app/actions";
import Link from "next/link";


export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
    <div className="flex w-full h-screen justify-center items-center">
        <Card>
            <CardHeader>
            <div>
            <h1 className="text-2xl font-medium">Reset Password</h1>
            <p className="text-sm text-secondary-foreground">
                Already have an account?{" "}
                <Link className="text-primary underline" href="/sign-in">
                Sign in
                </Link>
            </p>
            </div>
            </CardHeader>
            <CardContent>
            <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
                <div className="flex flex-col gap-2 [&>input]:mb-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <SubmitButton formAction={forgotPasswordAction}>
                    Reset Password
                </SubmitButton>
                <FormMessage message={searchParams} />
                </div>
            </form>
            </CardContent>
        </Card>
    </div>
      
    </>
  );
}