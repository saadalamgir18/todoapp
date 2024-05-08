"use client";
import React, { useState } from "react";
import EditPopup from "./EditPopUp";
import { CiEdit } from "react-icons/ci";
import { todoId, todoTask } from "@/store/atoms/editTodos";
import { useRecoilValue } from "recoil";

const EditTodo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const task = useRecoilValue(todoTask);
  const todoID = useRecoilValue(todoId);

  const handleUpdateTodo = async () => {
    console.log(`Updating todo with id ${todoID} to value: ${task}`);
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)} className="focus:outline-none">
        <CiEdit />
      </button>
      {showPopup && (
        <EditPopup
          onClose={() => setShowPopup(false)}
          onUpdate={handleUpdateTodo}
        />
      )}
    </div>
  );
};

export default EditTodo;
