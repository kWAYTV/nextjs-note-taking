import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSidebarSkeleton({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* Title skeleton */}
        <div className="flex items-center gap-2 pl-2">
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Search form skeleton */}
        <SidebarGroup className="py-0">
          <SidebarGroupContent className="relative">
            <Skeleton className="h-9 w-full" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {/* Skeleton for notebook entries */}
        {Array.from({ length: 3 }).map((_, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm">
              <Skeleton className="h-5 w-24" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 2 + i }).map((_, j) => (
                  <SidebarMenuItem key={j}>
                    <SidebarMenuButton>
                      <Skeleton className="h-4 w-4 shrink-0" />
                      <Skeleton className="h-4 flex-1" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
