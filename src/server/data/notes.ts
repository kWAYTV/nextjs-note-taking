"use server";

import {
  getAuthenticatedUserId,
  validateNoteOwnership,
  validateNotebookOwnership,
} from "@/server/data/user";
import { db } from "@/server/db";
import { type InsertNote, notes } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const createNote = async (values: Omit<InsertNote, "id">) => {
  try {
    const userId = await getAuthenticatedUserId();

    // Validate user owns the notebook
    await validateNotebookOwnership(values.notebookId, userId);

    // Validate input
    if (!values.title?.trim()) {
      return { success: false, message: "Title is required" };
    }

    if (!values.content) {
      return { success: false, message: "Content is required" };
    }

    const [note] = await db
      .insert(notes)
      .values({
        ...values,
        title: values.title.trim(),
      })
      .returning();

    return { success: true, message: "Note created successfully", note };
  } catch (error) {
    console.error("Create note error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return { success: false, message: "Please log in to create notes" };
      }
      if (
        error.message.includes("Forbidden") ||
        error.message.includes("not found")
      ) {
        return { success: false, message: error.message };
      }
    }

    return { success: false, message: "Failed to create note" };
  }
};

export const getNoteById = async (id: string) => {
  try {
    const userId = await getAuthenticatedUserId();

    if (!id?.trim()) {
      return { success: false, message: "Note ID is required" };
    }

    const note = await validateNoteOwnership(id, userId);

    return { success: true, note };
  } catch (error) {
    console.error("Get note error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return { success: false, message: "Please log in to view notes" };
      }
      if (
        error.message.includes("Forbidden") ||
        error.message.includes("not found")
      ) {
        return { success: false, message: error.message };
      }
    }

    return { success: false, message: "Failed to get note" };
  }
};

export const updateNote = async (
  id: string,
  values: Partial<Omit<InsertNote, "id" | "notebookId">>,
) => {
  try {
    const userId = await getAuthenticatedUserId();

    if (!id?.trim()) {
      return { success: false, message: "Note ID is required" };
    }

    // Validate ownership before update
    await validateNoteOwnership(id, userId);

    // Validate input
    const updateData: Partial<InsertNote> = {};

    if (values.title !== undefined) {
      if (!values.title?.trim()) {
        return { success: false, message: "Title cannot be empty" };
      }
      updateData.title = values.title.trim();
    }

    if (values.content !== undefined) {
      if (!values.content) {
        return { success: false, message: "Content cannot be empty" };
      }
      updateData.content = values.content;
    }

    if (Object.keys(updateData).length === 0) {
      return { success: false, message: "No valid fields to update" };
    }

    updateData.updatedAt = new Date();

    await db.update(notes).set(updateData).where(eq(notes.id, id));

    return { success: true, message: "Note updated successfully" };
  } catch (error) {
    console.error("Update note error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return { success: false, message: "Please log in to update notes" };
      }
      if (
        error.message.includes("Forbidden") ||
        error.message.includes("not found")
      ) {
        return { success: false, message: error.message };
      }
    }

    return { success: false, message: "Failed to update note" };
  }
};

export const deleteNote = async (id: string) => {
  try {
    const userId = await getAuthenticatedUserId();

    if (!id?.trim()) {
      return { success: false, message: "Note ID is required" };
    }

    // Validate ownership before delete
    await validateNoteOwnership(id, userId);

    await db.delete(notes).where(eq(notes.id, id));

    return { success: true, message: "Note deleted successfully" };
  } catch (error) {
    console.error("Delete note error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return { success: false, message: "Please log in to delete notes" };
      }
      if (
        error.message.includes("Forbidden") ||
        error.message.includes("not found")
      ) {
        return { success: false, message: error.message };
      }
    }

    return { success: false, message: "Failed to delete note" };
  }
};
