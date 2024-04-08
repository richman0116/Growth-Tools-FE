import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import type { Metadata } from "next";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata: Metadata = {
  title: "Login",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="en" suppressHydrationWarning>
     <GoogleOAuthProvider clientId="583270569276-at80fs6dtu4p6a8m6v7ktv2gsv8d203c.apps.googleusercontent.com">
      <Header />
      {children}
      <Footer />
      </GoogleOAuthProvider>
    </section>
  );
}
