import { boolean } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users_tbl = pgTable("users", {
  email: varchar({ length: 255 }).primaryKey(),
  is_super: boolean().notNull()
});
