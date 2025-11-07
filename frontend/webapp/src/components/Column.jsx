import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Container from "./Container";

const random = Math.random;

function Column({ title, tasks, id }) {
  return (
    <div className="h-full w-lg flex-col bg-veritas-dark ">
      <div className="bg-veritas-backgroundColor w-full h-fit p-4 ">
        <h2 className="text-veritas-textColor">{title}</h2>
      </div>

      <Droppable
        droppableId={id.toString()}
        direction="vertical"
        isDropDisabled={false}
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
                    assignedTo={task.assignedTo}
                    dueDate={task.dueDate}
                    index={index}
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
