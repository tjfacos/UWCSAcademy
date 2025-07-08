import { integer, pgTable, varchar, boolean, smallint, unique } from "drizzle-orm/pg-core";

export const courses_tbl = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 1023 }),
  author: varchar({ length: 255 }).notNull(),
  directory: varchar({ length: 255 }).notNull(),
  hidden: boolean().notNull()
});

export const lessons_tbl = pgTable("lessons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  order: integer().notNull(),
  interactive: boolean().notNull(),
  course: integer().notNull().references(() => courses_tbl.id, {onDelete: 'cascade'}),
  directory: varchar({ length: 255 }).notNull(),
  markdown: varchar({ length: 255 }).notNull(),
  hidden: boolean().notNull()
}, (t) => ({
  lesson_unique_on_course: unique('lesson_unique_on_course').on(t.title, t.course),
}))