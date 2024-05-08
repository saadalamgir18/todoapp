import { todoId, todoTask } from "@/store/atoms/editTodos";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
type PropsType = {
  onClose: any;
  onUpdate: any;
};
const EditPopup = (props: PropsType) => {
  const [task, setodtask] = useRecoilState(todoTask);
  const todoID = useRecoilValue(todoId);
  const [_, startTransition] = useTransition();
  const { refresh } = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setodtask(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      const req = await fetch("/api/todos", {
        method: "PATCH",
        body: JSON.stringify({
          id: todoID,
          task: task,
        }),
      });
      startTransition(() => {
        refresh();
      });
    } catch (error) {
      console.log(error);
    }

    props.onUpdate(task);
    console.log("editpopup: ", task, todoID);
    props.onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Edit Todo</h2>
          <button onClick={props.onClose}>
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <button
            type="submit"
            onClick={handleUpdate}
            className="bg-gradient-to-b from-primary to-secondary text-white px-2 py-1  rounded-md focus:outline-none"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
