import { UserAuthRegisterForm } from "@/components/auth/user-auth-register-form";

export default function SignInPage() {
  return (
    <section>
      <div className="container h-vh">
        <div className="flex flex-col items-center justify-center py-28">
          <h1 className="font-bold text-4xl mb-6 font-clash">Sign Up</h1>
          <p className="mb-[72px] font-medium text-base font-satoshi">
            Browse through hundreds of unique tools to boost your marketing &
            startup.
          </p>
          <UserAuthRegisterForm />
        </div>
      </div>
    </section>
  );
}
