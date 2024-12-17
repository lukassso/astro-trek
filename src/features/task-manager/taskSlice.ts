import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task, TaskState, TaskFilterValue } from "./types";

// Function to retrieve tasks from local storage
const retrieveTasksFromLocalStorage = (): Task[] => {
  const tasks = typeof localStorage !== "undefined" && localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Initial state for the task slice
const initialState: TaskState = {
  tasks: retrieveTasksFromLocalStorage(),
  filteredTasks: retrieveTasksFromLocalStorage(),
  filterValue: "all",
};

// Creating a slice for tasks
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Action to add a task
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload); // Adding new task to the tasks array
      taskSlice.caseReducers.saveTasks(state); // Calling the saveTasks reducer to save tasks to local storage
    },
    // Action to toggle task completion
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload); // Finding the task by id
      if (task) {
        task.isCompleted = !task.isCompleted; // Toggling task completion status
        taskSlice.caseReducers.saveTasks(state); // Calling the saveTasks reducer to save tasks to local storage
      }
    },
    // Action to delete a task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Filtering out the deleted task
      taskSlice.caseReducers.saveTasks(state); // Calling the saveTasks reducer to save tasks to local storage
    },
    // Action to filter tasks
    filterTasks: (state, action: PayloadAction<TaskFilterValue>) => {
      state.filterValue = action.payload; // Updating filter value
      switch (action.payload) {
        case "active":
          state.filteredTasks = state.tasks.filter((task) => !task.isCompleted); // Filtering active tasks
          break;
        case "completed":
          state.filteredTasks = state.tasks.filter((task) => task.isCompleted); // Filtering completed tasks
          break;
        case "all":
          state.filteredTasks = state.tasks; // Showing all tasks
          break;
        default:
          const unexpectedValue: never = action.payload;
          throw new Error(`Unexpected value: ${unexpectedValue}`);
      }
    },
    // Action to delete completed tasks
    deleteCompletedTasks: (state) => {
      state.tasks = state.tasks.filter((task) => !task.isCompleted); // Filtering out completed tasks
      state.filterValue = "all"; // Resetting filter value to "all"
      taskSlice.caseReducers.saveTasks(state);
    },
    // Action to save tasks to local storage
    saveTasks: (state) => {
      state.filteredTasks = state.tasks; // Updating filtered tasks
      saveTasksToLocalStorage(state.tasks); // Saving tasks to local storage
    },
  },
});

// Exporting actions
export const { addTask, toggleTaskCompletion, deleteTask, filterTasks, deleteCompletedTasks } =
  taskSlice.actions;

// Exporting reducer
export default taskSlice.reducer;
