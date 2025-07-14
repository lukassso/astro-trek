import { useState } from "react";
import { addTask } from "@/features/task-manager/taskSlice";
import { useAppDispatch } from "@/features/task-manager/store";
import { store } from "@/features/task-manager/store";

function TaskForm() {
  const [task, setTask] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addTask({
        id: new Date().getTime().toString(),
        name: task,
        isCompleted: false,
      }),
    );
    console.log("tasks", store.getState().taskState.tasks);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      <div className="flex flex-wrap items-end">
        <div className="w-full px-1 md:w-3/4">
          <label htmlFor="task" className="mb-2 block text-sm font-bold text-gray-700">
            Enter your task
          </label>
          <input
            type="text"
            id="task"
            className="focus:shadow-outlin w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            aria-label="Enter your task here"
          />
        </div>

        <button
          type="submit"
          className="focus:shadow-outline mx-1 mt-2 max-h-[38px] w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none md:mx-0 md:w-1/4"
          aria-label="Add task"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
