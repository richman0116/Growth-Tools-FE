import { TopHeader } from "@/components/admin/header";
import { Sidebar } from "@/components/admin/nav";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="grow">
        <TopHeader />
        {children}
      </div>
    </main>
  );
}
