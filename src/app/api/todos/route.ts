// import {query}  from '@/utils/postgres'; // Adjust the path based on your project structure
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { eq } from "drizzle-orm";
import { todoTable } from "../../../../lib/schema";
import zod from "zod";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const result = await db.select().from(todoTable).execute();
    // console.log(result)
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      ErrorMessage: (error as { message: string }).message,
    });
  }
}
const todoSchema = zod.object({
  task: zod.string().min(1, { message: "Task is required" }),
});
export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    const { success } = todoSchema.safeParse(req);
    const error_mesage = todoSchema.safeParse(req).error?.errors[0].message;

    if (req.task && success) {
      await db
        .insert(todoTable)
        .values({
          task: req.task,
        })
        .execute();

      return NextResponse.json({
        message: "Posted succesfully",
      });
    } else {
      return NextResponse.json({
        message: error_mesage,
      });
    }
  } catch (error) {
    return NextResponse.json({
      ErrorMessage: (error as { message: string }).message,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.id) {
      await db.delete(todoTable).where(eq(todoTable.id, req.id)).execute();
      return NextResponse.json({
        message: "Deleted succesfully",
      });
    } else {
      return NextResponse.json({
        message: "ID is required",
      });
    }
  } catch (error) {
    return NextResponse.json({
      ErrorMessage: (error as { message: string }).message,
    });
  }
}

export async function PATCH(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.task) {
      await db
        .update(todoTable)
        .set({ task: req.task })
        .where(eq(todoTable.id, req.id))
        .execute();
      return NextResponse.json({
        message: "updated succesfully",
      });
    } else {
      return NextResponse.json({
        message: "Task not provided",
      });
    }
  } catch (error) {
    return NextResponse.json({
      ErrorMessage: (error as { message: string }).message,
    });
  }
}
