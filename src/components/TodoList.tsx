"use client";
import { useEffect, useState } from "react";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import { useRecoilState, useRecoilValue } from "recoil";
import { newTodo, todoId, todoTask, todosState } from "@/store/atoms/editTodos";

function TodoList() {
  const [todoID, setodID] = useRecoilState(todoId);
  const [_, setodtask] = useRecoilState(todoTask);
  const [todo, setData] = useRecoilState(todosState);
  const newTODO = useRecoilValue(newTodo);

  useEffect(() => {
    try {
      fetch("/api/todos", {
        method: "GET",
        cache: "no-store",
        redirect: "follow",
      })
        .then(async (res) => {
          const data = await res.json();
          setData(data);
        })
        .catch((error) => console.log(error.message));
    } catch (err) {
      console.log(err);
    }
  }, [setData, newTODO, todoID]);

  return (
    <div className="max-h-[600px] overflow-auto px-4 mb-4 mx-1">
      {todo.map((items) => (
        <div
          key={items.id}
          className="bg-gray-200 py-2 px-4 flex items-center shadow rounded-lg gap-x-4 my-4"
        >
          <div className="h-3 w-3 bg-secondary rounded-full shrink-0"></div>

          <p className="text-lg font-medium"> {items.task} </p>

          <div className="ml-auto">
            <DeleteTodo todoID={items.id} />
          </div>
          <div
            onClick={() => {
              setodID(items.id);
              setodtask(items.task);
            }}
          >
            <EditTodo />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
