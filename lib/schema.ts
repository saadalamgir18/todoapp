import {
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
  } from "drizzle-orm/pg-core";
  
  export const todoTable = pgTable(
    "todos",
    {
        id: serial("id").primaryKey().notNull(),
        task: text("task").notNull(),
        createdAt: timestamp('createdAt').defaultNow().notNull()
    },
    (todoTable) => {
      return {
        uniqueIdx: uniqueIndex("unique_idx").on(todoTable.id),
      };
    }
  );