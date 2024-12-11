// import { BsTrash } from 'react-icons/bs';
import { useAppDispatch } from "@/features/task-manager/hooks";
import { deleteTask } from "@/features/task-manager/taskSlice";
import { BsTrash } from "react-icons/bs";

function TaskDeleteBtn({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(id));
  };
  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label="delete task"
      className="hover:text-green-600"
    >
      <BsTrash />
    </button>
  );
}

export default TaskDeleteBtn;
