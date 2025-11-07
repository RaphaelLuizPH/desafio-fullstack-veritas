import { Draggable } from "react-beautiful-dnd";
import Container from "./Container";

function Task({ id, title, description, status, assignedTo, dueDate, index, editTask }) {
  const getStatusColor = (dragginOver) => {
    console.log(dragginOver)
    const statusColors = {
      3: "border-yellow-400 ",
      2: "border-blue-400",
      1: "border-green-400",
    };
    return statusColors[dragginOver] || getStatusColor(status || 1);
  };

  const DragginScaleStyles = (snapshot) => {
    if (snapshot.draggingOver == "bin") {
      return "scale-50 opacity-50";
    } else {
      return snapshot.isDragging ? "scale-70 shadow-lg" : "";
    }
  };

  return (
    <Draggable draggableId={`${id}_${title}`} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div onClick={editTask}
            className={`bg-white duration-75 ${DragginScaleStyles(
              snapshot
            )} rounded-lg m-3 shadow-md p-4 mb-3 border-l-4  ${getStatusColor(
              snapshot.draggingOver
            )}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-800">{title}</h3>
              <span className="text-xs text-gray-500">#{id}</span>
            </div>

            {description && (
              <p className="text-sm text-gray-600 mb-3">{description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              {dueDate && (
                <span className="text-gray-500">Data limite: {dueDate}</span>
              )}
            </div>

            {assignedTo && (
              <div className="flex items-center gap-2 text-xs">
                <div className="ml-auto text-[0.6rem] w-6 h-6 p-6 rounded-full bg-veritas-dark-green text-white flex items-center justify-center">
                  {assignedTo}
                </div>
              </div>
            )}
          </div>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
