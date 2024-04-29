import { UserAuthLoginForm } from "@/components/auth/user-auth-login-form";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense>
        <section>
        <div className="container h-svh">
            <div className="flex flex-col items-center justify-center py-28">
            <h1 className="font-bold text-4xl mb-6 font-clash">Sign In</h1>
            <p className="mb-[72px] font-medium text-base">
                Browse through hundreds of unique tools to boost your marketing &
                startup.
            </p>
            <UserAuthLoginForm />
            </div>
        </div>
        </section>
    </Suspense>
  );
}
