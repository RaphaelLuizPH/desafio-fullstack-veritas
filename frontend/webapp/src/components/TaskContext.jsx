import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import Task from "./Task";
import ax from "../axios/axios";
import TaskForm from "./Form";
import { TaskContext } from "./useTaskContext";
import toast, { Toaster } from "react-hot-toast";

function TaskContextProvider({ children }) {
  const [isPendingTask, startTransitionTask] = useTransition();
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [openForm, setOpenForm] = useState({ bool: false, task: null });
  const listMappings = {
    3: todo,
    2: inProgress,
    1: completed,
  };

  function openTaskForm(task) {
    if (task) {
      setOpenForm({ bool: true, task: task });
      return;
    }
    setOpenForm({ bool: true, task: null });
  }

  const closeTaskForm = useCallback(
    function closeTaskForm(e) {
      if (e.target.id === "backdrop") {
        setOpenForm({ bool: false, task: null });
      }
    },
    [setOpenForm]
  );

  const getters = { todo, inProgress, completed, listMappings, openForm };

  const setters = { setTodo, setInProgress, setCompleted, setOpenForm };
  const util = {
    openTaskForm,
    closeTaskForm,
    isPendingTask,
    startTransitionTask,
    toast,
  };

  async function handlePost(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      due_date: formData.get("due_date"),
      assigned_to: Number(formData.get("assigned_to")),
      status: 3,
    };
    console.log(data);
    await ax.post("/tasks/", data)
      .then(() => {
        event.target.reset();
        fetchTasks();
        setOpenForm({ bool: false, task: null });
      })
      .catch((error) => {
          throw error;
      });
  }

  async function handlePut(event) {

  
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      due_date: formData.get("due_date"),
      assigned_to: Number(formData.get("assigned_to")),
      status: openForm.task.status,
      id: openForm.task.id,
    };

    console.log(data);
    await ax.put("/tasks/", data)
      .then((response) => {
        console.log("Task edited successfully:", response.data);
        setOpenForm({ bool: false, task: null });
        fetchTasks();
        event.target.reset();
      })
      .catch((error) => {
        throw error;
      
      });
  }

  const handleFunction = openForm.task ? handlePut : handlePost;

  async function fetchTasks() {
    await ax.get("/tasks/all").then((response) => {
      const tasks = response.data;
      console.log(tasks);
      if (tasks?.length === 0 || !tasks) return;
      setTodo(tasks.filter((task) => task.status === 3));
      setInProgress(tasks.filter((task) => task.status === 2));
      setCompleted(tasks.filter((task) => task.status === 1));
    });
  }

  useEffect(() => {
    toast.promise(fetchTasks(), {
      loading: "Carregando tarefas...",
      success: "Tarefas carregadas com sucesso!",
      error: "Erro ao carregar as tarefas.",
    });
  }, []);

  return (
    <TaskContext.Provider value={{ getters, setters, util }}>
      {children}
      {openForm.bool && (
        <div
          id="backdrop"
          className="w-screen h-screen flex fixed bg-opa  backdrop-blur-2xl top-0 left-0 z-10"
          onClick={closeTaskForm}
        >
          <TaskForm
            closeForm={closeTaskForm}
            task={openForm.task}
            handleSubmit={handleFunction}
          />
        </div>
      )}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toasterId="default"
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "var(--color-veritas-dark-green)",
            color: "var(--color-veritas-light)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "var(--color-veritas-dark)",
              secondary: "var(--color-veritas-dark-green)",
            },
          },
        }}
      />
    </TaskContext.Provider>
  );
}

export default TaskContextProvider;
