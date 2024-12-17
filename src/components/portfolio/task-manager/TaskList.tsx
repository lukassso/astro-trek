import { useAppSelector } from "@/features/task-manager/hooks";
import TaskComponent from "./components/task-row/TaskComponent";
import TaskFilterBar from "./components/task-filter/TaskFilterBar";

function TaskList() {
  const { tasks, filteredTasks } = useAppSelector((state) => state.taskState);
  if (tasks.length === 0) return <h4>Your task list is empty.</h4>;
  const areNoTasksMatchingFilter = filteredTasks.length === 0;
  return (
    <section className="my-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      {areNoTasksMatchingFilter ? (
        <span>No tasks match the selected filter.</span>
      ) : (
        <ul className=" text-gray-800">
          {filteredTasks.map((task) => {
            return <TaskComponent key={task.id} task={task} />;
          })}
        </ul>
      )}
      <TaskFilterBar />
    </section>
  );
}

export default TaskList;
