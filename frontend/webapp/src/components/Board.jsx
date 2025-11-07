import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import ax from "../axios/axios";
import Bin from "./Bin";
import { useTaskContext } from "./useTaskContext";
export default function Board({ open }) {
  const { getters, setters } = useTaskContext();
  const { todo, inProgress, completed, listMappings } = getters;
  const { setTodo, setInProgress, setCompleted } = setters;

  function setListById(id, list) {
    switch (id) {
      case "3":
        setTodo(list);
        break;
      case "2":
        setInProgress(list);
        break;
      case "1":
        setCompleted(list);
        break;
    }
  }

  async function handleDragEnd(result) {
    console.log(result);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "bin") {
      const sourceList = Array.from(listMappings[Number(source.droppableId)]);
      const backupSourceList = Array.from(sourceList);
      const [movedItem] = sourceList.splice(source.index, 1);
      setListById(source.droppableId, sourceList);

      ax.delete(`/task/${movedItem.id}`)
        .then((response) => {
          console.log("Task deleted successfully:", response.data);
        })
        .catch((error) => {
          setListById(source.droppableId, backupSourceList);
          console.error("Error deleting task:", error);
        });
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = Array.from(listMappings[Number(source.droppableId)]);
      const [movedItem] = list.splice(source.index, 1);
      list.splice(destination.index, 0, movedItem);

      setListById(source.droppableId, list);
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceList = Array.from(listMappings[Number(source.droppableId)]);
      const destinationList = Array.from(
        listMappings[Number(destination.droppableId)]
      );

      const backupSourceList = Array.from(sourceList);
      const backupDestinationList = Array.from(destinationList);

      const [movedItem] = sourceList.splice(source.index, 1);
      movedItem.status = Number(destination.droppableId);
      destinationList.splice(destination.index, 0, movedItem);

      setListById(source.droppableId, sourceList);
      setListById(destination.droppableId, destinationList);

      ax.patch("/tasks/", {
        task_id: movedItem.id,
        status: movedItem.status,
      })
        .then((response) => {
          console.log("Task status updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating task status:", error);
          setListById(source.droppableId, backupSourceList);
          setListById(destination.droppableId, backupDestinationList);
        });
    }
  }
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-[90%] m-auto  bg-veritas-dark-green">
          <div className="flex  min-h-fit flex-wrap lg:flex-nowrap h-200 p-12 items-center justify-center gap-5 mt-10 m-auto overflow-clip">
            <Column title={"À Fazer"} tasks={todo} id={3} openForm={open} />
            <Column title={"Em progresso"} tasks={inProgress} id={2} />
            <Column title={"Concluído"} tasks={completed} id={1} />
          </div>
          <Bin />
        </div>
      </DragDropContext>
    </>
  );
}
