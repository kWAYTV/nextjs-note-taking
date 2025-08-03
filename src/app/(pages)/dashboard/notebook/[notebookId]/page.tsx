import { CreateNoteButton } from "@/components/core/dashboard/notes/create-note-button";
import { NoteCard } from "@/components/core/dashboard/notes/note-card";
import { PageWrapper } from "@/components/core/dashboard/page-wrapper";
import { getNotebookById } from "@/server/data/notebooks";

type Params = Promise<{
  notebookId: string;
}>;

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookId } = await params;

  const { notebook } = await getNotebookById(notebookId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${notebookId}`,
        },
      ]}
    >
      <div className="flex items-center justify-between">
        <h1>{notebook?.name}</h1>
        <CreateNoteButton notebookId={notebookId} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebook?.notes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </PageWrapper>
  );
}
