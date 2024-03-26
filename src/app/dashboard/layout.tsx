import { Footer } from "@/components/admin/footer";
import { TopHeader } from "@/components/admin/header";
import { Sidebar } from "@/components/admin/sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="grow overflow-x-hidden">
        <TopHeader />
        {children}
        <Footer />
      </div>
    </main>
  );
}
