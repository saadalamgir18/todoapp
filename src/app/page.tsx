"use client";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-primary to-secondary h-screen flex justify-center items-center">
      <div className="px-3 py-4 rounded-xl bg-gradient-to-br from-[#D9D9D9]/50 to-[#D9D9D9]/70 max-w-md w-full">
        <RecoilRoot>
          <TodoList />
          <AddTodo />
        </RecoilRoot>

        <div className="w-1/2 h-1.5 bg-black/80 rounded-md mx-auto mt-6"></div>
      </div>
    </main>
  );
}
