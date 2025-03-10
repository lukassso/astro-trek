import { type TaskFilterValue } from "@/features/task-manager/types";
import { useAppSelector, useAppDispatch } from "@/features/task-manager/hooks";
import { filterTasks } from "@/features/task-manager/taskSlice";

function TaskFilterBtn({ filterValue }: { filterValue: TaskFilterValue }) {
  const activeFilter = useAppSelector((state) => state.taskState.filterValue);
  const isActive = filterValue === activeFilter;
  const dispatch = useAppDispatch();
  const handleFilter = () => {
    dispatch(filterTasks(filterValue));
  };
  return (
    <button
      type="button"
      className={`${isActive && "text-blue-600"} hover:text-green-600`}
      onClick={handleFilter}
      aria-pressed={isActive}
      aria-label={`Filter tasks by ${filterValue}`}
    >
      {filterValue}
    </button>
  );
}
export default TaskFilterBtn;
