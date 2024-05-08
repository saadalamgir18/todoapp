import "./config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { todoTable } from "./schema";
import * as schema from "./schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const db = drizzle(sql, { schema });

export const getTask = async () => {
  const selectResult = await db.select().from(todoTable);
  console.log("Results", selectResult);
  return selectResult;
};

export type TodoType = InferSelectModel<typeof todoTable>;
export type NewTodoType = InferInsertModel<typeof todoTable>;
export const insertUser = async (getTask: TodoType) => {
  return db.insert(todoTable).values(getTask).returning();
};

export const getUsers2 = async () => {
  const result = await db.query.todoTable.findMany();
  return result;
};