import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapperHeaderSkeleton } from "./page-wrapper-header";

export function DashboardPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <PageWrapperHeaderSkeleton breadcrumbCount={1} />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header with title and button */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" /> {/* "Notebooks" title */}
          <Skeleton className="h-10 w-32" /> {/* CreateNotebookButton */}
        </div>

        {/* Grid of notebook cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" /> {/* Notebook title */}
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-16" /> {/* "X notes" */}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-9 w-16" /> {/* View button */}
                <Skeleton className="h-9 w-9" /> {/* Delete button */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
