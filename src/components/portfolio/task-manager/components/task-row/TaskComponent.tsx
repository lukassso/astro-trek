import { type Task } from "@/features/task-manager/types";
import TaskCompletionToggle from "../TaskCompletionToggle";
import TaskDeleteBtn from "../TaskDeleteBtn";

function TaskComponent({ task }: { task: Task }) {
  return (
    <li className="flex items-center gap-3 pb-2">
      <TaskCompletionToggle id={task.id} isCompleted={task.isCompleted} />
      <span
        className="flex-1"
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        {task.name}
      </span>
      <TaskDeleteBtn id={task.id} />
    </li>
  );
}

export default TaskComponent;
