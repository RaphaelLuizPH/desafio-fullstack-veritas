import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Board from "./components/Board.jsx";
import TaskForm from "./components/Form.jsx";
import TaskContextProvider from "./components/TaskContext.jsx";
import { useTaskContext } from "./components/useTaskContext.jsx";
function App() {
  const { getters, util } = useTaskContext();
  const { openForm } = getters;
  const { openTaskForm } = util;

  return (
    <>
      <Board openForm={openTaskForm} open={openForm} />
      <footer className="mt-12 bg-veritas-dark-green w-full h-12"></footer>
    </>
  );
}

export default App;
