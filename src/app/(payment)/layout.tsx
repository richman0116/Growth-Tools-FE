import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit tool",
};

export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="en" suppressHydrationWarning>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
