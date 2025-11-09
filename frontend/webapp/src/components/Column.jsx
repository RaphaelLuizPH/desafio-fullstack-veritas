import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Container from "./Container";
import { useTaskContext } from "./useTaskContext";
import { useEffect, useState } from "react";

const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#fff"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

function Column({ title, tasks, id, openForm }) {
  const { util } = useTaskContext();

  const { openTaskForm, isPendingTask } = util;

  


  return (
    <div className="h-full w-lg flex-col bg-veritas-dark ">
      <div className="bg-veritas-backgroundColor w-full h-fit p-4 flex justify-between items-center">
        <h2 className="text-veritas-textColor">{title}</h2>
        {openForm && !isPendingTask && (
          <span onClick={() => openTaskForm()} className="cursor-pointer">
            {" "}
            {searchIcon}{" "}
          </span>
        )}{" "}
        {isPendingTask && <span class="loader"></span>}
      </div>

      <Droppable
        droppableId={id.toString()}
        direction="vertical"
        isDropDisabled={isPendingTask}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided, snapshot) => {
          return (
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={"overflow-y-auto no-scrollbar h-[90%]"}
            >
              {tasks &&
                tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    assignedTo={task.assignee_name}
                    dueDate={task.due_date}
                    index={index}
                    editTask={() => openTaskForm(task)}
                  />
                ))}
              {provided.placeholder}
            </Container>
          );
        }}
      </Droppable>
    </div>
  );
}

export default Column;
