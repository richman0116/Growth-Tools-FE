import { DashBoardTemplate } from "@/components/admin/dash-board-template";
import { TanstackProvider } from "@/providers/TanstackProvider";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="en" suppressHydrationWarning>
      <TanstackProvider>
        <DashBoardTemplate navCollapsedSize={0}>{children}</DashBoardTemplate>
      </TanstackProvider>
    </section>
  );
}
