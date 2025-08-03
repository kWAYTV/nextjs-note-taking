"use server";

import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { notebooks, notes } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getAuthenticatedUserId = async (): Promise<string> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
};

export const validateNotebookOwnership = async (
  notebookId: string,
  userId: string,
) => {
  const notebook = await db.query.notebooks.findFirst({
    where: and(eq(notebooks.id, notebookId), eq(notebooks.userId, userId)),
    with: {
      notes: true,
    },
  });

  if (!notebook) {
    throw new Error("Notebook not found or access denied");
  }

  return notebook;
};

export const validateNoteOwnership = async (noteId: string, userId: string) => {
  const note = await db.query.notes.findFirst({
    where: eq(notes.id, noteId),
    with: {
      notebook: true,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  if (note.notebook.userId !== userId) {
    throw new Error("Forbidden: You don't own this note");
  }

  return note;
};
