import { useAppDispatch } from "@/features/task-manager/hooks";
import { toggleTaskCompletion } from "@/features/task-manager/taskSlice";

function TaskCompletionToggle({ isCompleted, id }: { isCompleted: boolean; id: string }) {
  const dispatch = useAppDispatch();

  const handleToggleCompleted = () => {
    dispatch(toggleTaskCompletion(id));
  };

  return (
    <input
      type="checkbox"
      className=" h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700"
      checked={isCompleted}
      onChange={handleToggleCompleted}
      aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as complete"}
    />
  );
}

export default TaskCompletionToggle;
