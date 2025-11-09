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

const orderIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
    />
  </svg>
);

function Column({ title, tasks, id, openForm }) {
  const { util } = useTaskContext();

  const { openTaskForm, isPendingTask } = util;

  return (
    <div className="2xl:h-[85%] 2xl:min-h-190 xl:min-w-[30%] h-[90%] min-h-fit  w-[30%] 2xl:flex-0 flex-col 3xl:flex-1 bg-veritas-dark ">
      <div className="bg-veritas-backgroundColor  h-fit p-4 flex justify-between items-center">
        <h2 className="text-veritas-textColor">
          <span className="text-veritas-light italic mr-1">
            {tasks?.length }{" "}
          </span>{" "}
          {title}{" "}
        </h2>
        {openForm && !isPendingTask && (
          <span onClick={() => openTaskForm()} className="cursor-pointer">
            {" "}
            {searchIcon}{" "}
          </span>
        )}{" "}
        {isPendingTask && <span className="loader"></span>}
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
              className={"overflow-y-auto no-scrollbar h-[90%] w-full items-center 2xl:flex flex-col 3xl:flex-row 3xl:flex-wrap   3xl:justify-center "}
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
