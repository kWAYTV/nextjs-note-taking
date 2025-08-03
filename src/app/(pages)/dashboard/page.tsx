import { AuthLoading, SignedIn } from "@daveyplate/better-auth-ui";

import { CreateNotebookButton } from "@/components/core/dashboard/notebooks/create-notebook-button";
import { NotebookCard } from "@/components/core/dashboard/notebooks/notebook-card";
import { PageWrapper } from "@/components/core/dashboard/page-wrapper";
import { DashboardPageSkeleton } from "@/components/core/loading/dashboard/dashboard-page";
import { getNotebooks } from "@/server/actions/data/notebooks";

export default async function Page() {
  const notebooks = await getNotebooks();

  return (
    <>
      <AuthLoading>
        <DashboardPageSkeleton />
      </AuthLoading>

      <SignedIn>
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
          <div className="flex items-center justify-between">
            <h1>Notebooks</h1>
            <CreateNotebookButton />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notebooks.success &&
              notebooks?.notebooks?.map((notebook) => (
                <NotebookCard key={notebook.id} notebook={notebook} />
              ))}
          </div>

          {notebooks.success && notebooks?.notebooks?.length === 0 && (
            <div>No notebooks found</div>
          )}
        </PageWrapper>
      </SignedIn>
    </>
  );
}
