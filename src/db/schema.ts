import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const NotesTable = sqliteTable("note", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  body: text("description"),
});
