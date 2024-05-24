import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { NotesTable } from "../db/schema.ts";
import { Response, Request, NextFunction } from "express";
import { CustomError } from "../lib/custom-error.ts";
import { validationResult } from "express-validator";

export async function addNote(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const note = await db.insert(NotesTable).values(req.body).returning();
    res.status(201).json({ note });
  } catch (error) {
    next(new CustomError("Failed to add note", 500));
  }
}

export async function getAllNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notes = await db.select().from(NotesTable);
    res.status(200).json({ notes });
  } catch (error) {
    next(new CustomError("Failed to fetch notes", 500));
  }
}

export async function getNote(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const note = await db
      .select()
      .from(NotesTable)
      .where(eq(NotesTable.id, +req.params.id));
    res.status(200).json({ note });
  } catch (error) {
    next(new CustomError("Failed to fetch note", 500));
  }
}

export async function deleteNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const note = await db
      .delete(NotesTable)
      .where(eq(NotesTable.id, +req.params.id))
      .returning({
        deletedNoteId: NotesTable.id,
      });
    res.status(200).json({ note });
  } catch (error) {
    next(new CustomError("Failed to delete note", 500));
  }
}

export async function updateNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400));
  }
  try {
    const note = await db
      .update(NotesTable)
      .set(req.body)
      .where(eq(NotesTable.id, +req.params.id))
      .returning();

    res.status(201).json({ note });
  } catch (error) {
    next(new CustomError("Failed to update note", 500));
  }
}
