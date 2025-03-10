import { deleteCompletedTasks } from "@/features/task-manager/taskSlice";
import { useAppDispatch } from "@/features/task-manager/hooks";

function RemoveCompletedBtn() {
  const dispatch = useAppDispatch();
  const handleRemoveCompleted = () => {
    dispatch(deleteCompletedTasks());
  };
  return (
    <button
      onClick={handleRemoveCompleted}
      aria-label="Clear completed tasks"
      className="focus:shadow-outline mt-2 max-h-[38px] w-full rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-primary focus:outline-none md:mx-0 md:w-1/4"
    >
      Clear completed
    </button>
  );
}
export default RemoveCompletedBtn;
