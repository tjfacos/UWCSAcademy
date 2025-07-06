import { integer, pgTable, varchar, boolean, smallint } from "drizzle-orm/pg-core";

export const courses_tbl = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 1023 }),
  author: varchar({ length: 255 }).notNull(),
  hidden: boolean().notNull()
});

export const lessons_tbl = pgTable("lessons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  order: integer().notNull(),
  interactive: boolean().notNull(),
  course: integer().notNull().references(() => courses_tbl.id)
})