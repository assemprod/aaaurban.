import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  objectType: text("object_type").notNull(),
  area: text("area").notNull().default(""),
  comment: text("comment").notNull().default(""),
  language: text("language").notNull().default("ru"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
