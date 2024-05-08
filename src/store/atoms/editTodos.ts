import { atom, selector } from "recoil";

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

export const todoId = atom({
  key: "todoId",
  default: 0,
});
export const todoTask = atom({
  key: "todoTask",
  default: "",
});

export const todosState = atom({
  key: "todos",
  default: [] as Todo[],
});

export const newTodo = atom({
  key: "newTodo",
  default: "",
});
