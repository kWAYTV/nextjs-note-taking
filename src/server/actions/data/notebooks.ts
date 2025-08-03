"use server";

import {
  getAuthenticatedUserId,
  validateNotebookOwnership,
} from "@/server/actions/data/user";
import { db } from "@/server/db";
import { type InsertNotebook, notebooks } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const createNotebook = async (values: Omit<InsertNotebook, "id">) => {
  try {
    const userId = await getAuthenticatedUserId();

    // Validate input
    if (!values.name?.trim()) {
      return { success: false, message: "Notebook name is required" };
    }

    if (values.name.trim().length < 1 || values.name.trim().length > 100) {
      return {
        success: false,
        message: "Notebook name must be between 1 and 100 characters",
      };
    }

    // Ensure user owns this notebook
    const notebookData: InsertNotebook = {
      ...values,
      name: values.name.trim(),
      userId,
    };

    const [notebook] = await db
      .insert(notebooks)
      .values(notebookData)
      .returning();

    return {
      success: true,
      message: "Notebook created successfully",
      notebook,
    };
  } catch (error) {
    console.error("Create notebook error:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
      return { success: false, message: "Please log in to create notebooks" };
    }

    return { success: false, message: "Failed to create notebook" };
  }
};

export const getNotebooks = async () => {
  try {
    const userId = await getAuthenticatedUserId();

    const notebooksByUser = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: {
        notes: {
          orderBy: (notes, { desc }) => [desc(notes.updatedAt)],
        },
      },
      orderBy: (notebooks, { desc }) => [desc(notebooks.updatedAt)],
    });

    return { success: true, notebooks: notebooksByUser };
  } catch (error) {
    console.error("Get notebooks error:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
      return { success: false, message: "Please log in to view notebooks" };
    }

    return { success: false, message: "Failed to get notebooks" };
  }
};

export const getNotebookById = async (id: string) => {
  try {
    const userId = await getAuthenticatedUserId();

    if (!id?.trim()) {
      return { success: false, message: "Notebook ID is required" };
    }

    const notebook = await validateNotebookOwnership(id, userId);

    return { success: true, notebook };
  } catch (error) {
    console.error("Get notebook error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return { success: false, message: "Please log in to view notebooks" };
      }
      if (
        error.message.includes("not found") ||
        error.message.includes("access denied")
      ) {
        return { success: false, message: error.message };
      }
    }

    return { success: false, message: "Failed to get notebook" };
  }
};

export const updateNotebook = async (
  id: string,
  values: Partial<Omit<InsertNotebook, "id" | "userId">>,
) => {
  try {
    const userId = await getAuthenticatedUserId();

    if (!id?.trim()) {
      return { success: false, message: "Notebook ID is required" };
    }

    // Validate ownership before update
    await validateNotebookOwnership(id, userId);

    // Validate input
    const updateData: Partial<InsertNotebook> = {};

    if (values.name !== undefined) {
      if (!values.name?.trim()) {
        return { success: false, message: "Notebook name cannot be empty" };
      }

      if (values.name.trim().length > 100) {
        return {
          success: false,
          message: "Notebook name cannot exceed 100 characters",
        };
      }

      updateData.name = values.name.trim();
    }

    if (Object.keys(updateData).length === 0) {
      return { success: false, message: "No valid fields to update" };
    }

    updateData.updatedAt = new Date();

    await db.update(notebooks).set(updateData).where(eq(notebooks.id, id));

    return { success: true, message: "Notebook updated successfully" };
  } catch (error) {
    console.error("Update notebook error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return { success: false, message: "Please log in to update notebooks" };
      }
      if (
        error.message.includes("not found") ||
        error.message.includes("access denied")
      ) {
        return { success: false, message: error.message };
      }
    }

    return { success: false, message: "Failed to update notebook" };
  }
};

export const deleteNotebook = async (id: string) => {
  try {
    const userId = await getAuthenticatedUserId();

    if (!id?.trim()) {
      return { success: false, message: "Notebook ID is required" };
    }

    // Validate ownership before delete
    await validateNotebookOwnership(id, userId);

    // Note: This will cascade delete all notes in the notebook due to schema constraints
    await db.delete(notebooks).where(eq(notebooks.id, id));

    return {
      success: true,
      message: "Notebook and all its notes deleted successfully",
    };
  } catch (error) {
    console.error("Delete notebook error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return { success: false, message: "Please log in to delete notebooks" };
      }
      if (
        error.message.includes("not found") ||
        error.message.includes("access denied")
      ) {
        return { success: false, message: error.message };
      }
    }

    return { success: false, message: "Failed to delete notebook" };
  }
};
