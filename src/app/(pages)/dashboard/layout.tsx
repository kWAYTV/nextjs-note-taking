import { AppSidebar } from "@/components/core/dashboard/sidebar/app-sidebar";
import { DashboardSidebarSkeleton } from "@/components/core/loading/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        <AppSidebar />
      </Suspense>
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
