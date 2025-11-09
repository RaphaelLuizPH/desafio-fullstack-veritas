import { Draggable } from "react-beautiful-dnd";
import Container from "./Container";
import { useTaskContext } from "./useTaskContext";

function Task({
  id,
  title,
  description,
  status,
  assignedTo,
  dueDate,
  index,
  editTask,
}) {
  const getStatusColor = (draggingOver) => {
    const statusColors = {
      3: "border-yellow-400 ",
      2: "border-blue-400",
      1: "border-green-400",
      bin: "border-red-600",
    };
   
    return statusColors[draggingOver] || getStatusColor(status || 1);
  };

  const { util } = useTaskContext();
  const { isPendingTask } = util;

  const DragginScaleStyles = (snapshot) => {
    if (snapshot.draggingOver == "bin") {
      return " opacity-50 border-4";
    } else {
      return snapshot.isDragging ? " border-4 shadow-lg" : "";
    }
  };

  return (
    <Draggable
      draggableId={`${id}_${title}`}
      index={index}
      isDragDisabled={isPendingTask}
    >
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            onClick={editTask}
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
              <div className="flex items-center justify-between gap-2  text-xs w-full">
                <p className=" align-baseline font-extrabold w-fit h-fit m-0 p-0">
                  {assignedTo}
                </p>
                <div className=" w-12 h-12  ">
                  <img
                    className="w-full h-full rounded-2xl "
                    src={
                      "https://api.dicebear.com/9.x/thumbs/svg?seed=" +
                      assignedTo
                    }
                    alt="avatar"
                  />
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
