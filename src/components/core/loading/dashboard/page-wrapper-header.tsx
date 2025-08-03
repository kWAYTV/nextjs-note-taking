import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

interface PageWrapperHeaderSkeletonProps {
  breadcrumbCount: number;
}

export function PageWrapperHeaderSkeleton({
  breadcrumbCount,
}: PageWrapperHeaderSkeletonProps) {
  return (
    <header className="flex items-center border-b p-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              {Array.from({ length: breadcrumbCount }).map((_, index) => (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    <Skeleton className="h-4 w-20" />
                  </BreadcrumbItem>
                  {index !== breadcrumbCount - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9" /> {/* ModeToggle */}
          <Skeleton className="h-8 w-8 rounded-full" /> {/* UserButton */}
        </div>
      </div>
    </header>
  );
}
