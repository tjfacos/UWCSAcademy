import { boolean } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users_tbl = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  is_super: boolean().notNull()
});
