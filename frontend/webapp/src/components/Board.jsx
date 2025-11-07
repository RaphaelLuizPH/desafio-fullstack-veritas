import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import ax from "../axios/axios";

export default function Board() {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  // eslint-ignore-next-line
  const listMappings = {
    0: todo,
    1: inProgress,
    2: completed,
  };

  useEffect(() => {
    ax.get("/tasks/all").then((response) => {
      const tasks = response.data;
      console.log(tasks)
      setTodo(tasks.filter((task) => task.status === 0));
      setInProgress(tasks.filter((task) => task.status === 1));
      setCompleted(tasks.filter((task) => task.status === 2));
    });
  }, []);

  function handleDragEnd(result) {
    console.log(result);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = Array.from(listMappings[Number(source.droppableId)]);
      const [movedItem] = list.splice(source.index, 1);
      list.splice(destination.index, 0, movedItem);
      switch (source.droppableId) {
        case "0":
          setTodo(list);
          break;
        case "1":
          setInProgress(list);
          break;
        case "2":
          setCompleted(list);
          break;
      }
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceList = Array.from(listMappings[Number(source.droppableId)]);
      const destinationList = Array.from(
        listMappings[Number(destination.droppableId)]
      );
      const [movedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedItem);
      switch (source.droppableId) {
        case "0":
          setTodo(sourceList);
          break;
        case "1":
          setInProgress(sourceList);
          break;
        case "2":
          setCompleted(sourceList);
          break;
      }

      switch (destination.droppableId) {
        case "0":
          setTodo(destinationList);
          break;
        case "1":
          setInProgress(destinationList);
          break;
        case "2":
          setCompleted(destinationList);
          break;
      }
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex w-[90%] flex-wrap lg:flex-nowrap h-200 p-12 items-center justify-center gap-5 mt-10 m-auto bg-veritas-dark-green">
          <Column title={"To do"} tasks={todo} id={0} />
          <Column title={"In Progress"} tasks={inProgress} id={1} />
          <Column title={"Completed"} tasks={completed} id={2} />
        </div>
      </DragDropContext>
    </>
  );
}
