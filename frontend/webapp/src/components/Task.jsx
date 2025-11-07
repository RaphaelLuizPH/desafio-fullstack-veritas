import { Draggable } from "react-beautiful-dnd";
import Container from "./Container";

function Task({ id, title, description, status, assignedTo, dueDate, index }) {
  const getStatusColor = (dragginOver) => {
    const statusColors = {
      0: "border-yellow-400",
      1: "border-blue-400",
      2: "border-green-400",
    };
    return statusColors[dragginOver] || "border-gray-200";
  };

  return (
    <Draggable draggableId={`${id}_${title}`} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`bg-white duration-75 ${
              snapshot.isDragging ? "scale-120" : ""
            } rounded-lg m-3 shadow-md p-4 mb-3 border-l-4  ${getStatusColor(snapshot.draggingOver)}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-800">{title}</h3>
              <span className="text-xs text-gray-500">#{id}</span>
            </div>

            {description && (
              <p className="text-sm text-gray-600 mb-3">{description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span className={`px-2 py-1 rounded ${getStatusColor(status)}`}>
                {status}
              </span>
              {dueDate && <span className="text-gray-500">{dueDate}</span>}
            </div>

            {assignedTo && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-600">Assigned to:</span>
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
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
