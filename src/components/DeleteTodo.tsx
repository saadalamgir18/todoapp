"use client";
import { todoId } from "@/store/atoms/editTodos";
import { NewTodoType } from "../../lib/db";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
type ID = {
  id: number;
};

function DeleteTodo({ todoID }: { todoID: number }) {
  const [todoid, setTodoId] = useRecoilState(todoId);

  const { refresh } = useRouter();
  const [_, startTransition] = useTransition();

  async function handleDelete() {
    try {
      await fetch("/api/todos", {
        method: "DELETE",
        body: JSON.stringify({
          id: todoID,
        }),
      });
      setTodoId(todoID);
      startTransition(() => {
        refresh();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleDelete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default DeleteTodo;
