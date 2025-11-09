import { useEffect, useMemo, useState, useTransition } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import ax from "../axios/axios";
import Bin from "./Bin";
import { useTaskContext } from "./useTaskContext";
import { delay } from "../axios/delay";
export default function Board({ open }) {
  const { getters, setters, util } = useTaskContext();
  const { todo, inProgress, completed, listMappings } = getters;
  const { setTodo, setInProgress, setCompleted } = setters;
  const { startTransitionTask, toast } = util;

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

  useEffect(() => {
    const count = todo?.length + inProgress?.length;

    if (count == 0) {
      window.document.title = ` Board | Concluído: ${completed?.length} `;
      return;
    }

    window.document.title = ` Board | Tarefas: ${count} `;
  }, [completed?.length, inProgress?.length, todo.length]);

  async function handleDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "bin") {
      const sourceList = Array.from(listMappings[Number(source.droppableId)]);
      const backupSourceList = Array.from(sourceList);
      const [movedItem] = sourceList.splice(source.index, 1);
      setListById(source.droppableId, sourceList);

      await ax
        .delete(`/task/${movedItem.id}`)
        .then((response) => {
          toast.success("Tarefa deletada com sucesso!");
          console.info("Task deleted successfully:", response.data);
        })
        .catch((error) => {
          toast.error("Erro ao deletar a tarefa. " + error.message);
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
      startTransitionTask(
        async () =>
          await ax
            .patch("/tasks/", {
              task_id: movedItem.id,
              status: movedItem.status,
            })
            .then((response) => {
              toast.success("Status da tarefa atualizado com sucesso!");
              console.info("Task status updated successfully:", response.data);
            })
            .catch((error) => {
              console.error(error);
              toast.error(
                "Erro ao atualizar o status da tarefa. " + error.message
              );
              console.error("Error updating task status:", error);
              setListById(source.droppableId, backupSourceList);
              setListById(destination.droppableId, backupDestinationList);
            })
      );
    }
  }
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-full h-screen  min-h-fit m-auto  mt-0   bg-veritas-dark-green">
          <div className="flex h-full min-h-fit w-full flex-wrap lg:flex-nowrap  p-12 pt-1 items-start justify-center gap-5 ">
            <Column title={"À Fazer"} tasks={todo} id={3} openForm={open} />
            <Column title={"Em progresso"} tasks={inProgress} id={2} />
            <Column title={"Concluído"} tasks={completed} id={1} />
          </div>
        </div>
        <Bin />
      </DragDropContext>
    </>
  );
}
