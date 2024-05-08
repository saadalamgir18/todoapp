"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import send from "../../public/send.png";
import { NewTodoType } from "../../lib/db";
import { useRouter } from "next/navigation";
import { newTodo } from "@/store/atoms/editTodos";
import { useRecoilState } from "recoil";
function AddTodo() {
  const [task, setTask] = useState<NewTodoType | null>(null);
  const { refresh } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [inputText, setInputText] = useState("");
  const [newTODO, setNewTodo] = useRecoilState(newTodo);
  const handSubmit = async () => {
    try {
      console.log(task);
      if (task) {
        const result = await fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify({
            task: task.task,
          }),
        });
        setNewTodo(task.task);
        setInputText("");
        startTransition(() => {
          refresh();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="w-full flex items-center gap-x-3">
        <input
          value={inputText}
          onChange={(e) => {
            setTask({ task: e.target.value });
            setInputText(e.target.value);
          }}
          type="text"
          className="rounded-full ml-3 w-full py-2 px-5 focus:outline-secondary"
        />
        <button
          type="button"
          onClick={handSubmit}
          className="p-2 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary"
        >
          <Image src={send} alt="" />
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
