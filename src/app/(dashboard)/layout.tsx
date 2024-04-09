import { DashBoardTemplate } from "@/components/admin/dash-board-template";
import { TanstackProvider } from "@/providers/TanstackProvider";
import type { Metadata } from "next";
import "../globals.css";
import Template from "./template";

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
        <Template>
          <DashBoardTemplate navCollapsedSize={0}>{children}</DashBoardTemplate>
        </Template>
      </TanstackProvider>
    </section>
  );
}
