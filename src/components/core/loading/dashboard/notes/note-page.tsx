import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapperHeaderSkeleton } from "../page-wrapper-header";

export function NotePageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <PageWrapperHeaderSkeleton breadcrumbCount={3} />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Note title */}
        <Skeleton className="h-8 w-48" />

        {/* Rich text editor skeleton */}
        <div className="flex flex-col gap-4">
          {/* Toolbar skeleton */}
          <div className="flex flex-wrap items-center gap-2 border-b pb-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>

          {/* Editor content area skeleton */}
          <div className="min-h-[400px] space-y-4 rounded-md border p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
