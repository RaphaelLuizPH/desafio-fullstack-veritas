import { createContext, useContext } from "react";

export const TaskContext = createContext();

export function useTaskContext() {
  return useContext(TaskContext);
}
