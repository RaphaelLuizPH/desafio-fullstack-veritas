import "./App.css";
import Board from "./components/Board.jsx";
import { useTaskContext } from "./components/useTaskContext.jsx";
function App() {
  const { getters, util } = useTaskContext();
  const { openForm } = getters;
  const { openTaskForm } = util;

  return (
    <>
      <Board openForm={openTaskForm} open={openForm} />
    </>
  );
}

export default App;
