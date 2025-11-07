import { useEffect, useState } from "react";
import ax from "../axios/axios";

export default function TaskForm({ updateBoard, task, handleSubmit }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ax.get("/users/all").then((response) => {
      const users = response.data;
      setUsers(users);
    });
  }, []);

  console.log(task);

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-lg w-full max-w-66 h-fit m-auto z-99 mx-auto p-6 rounded-2xl shadow-lg space-y-5 bg-veritas-backgroundColor text-veritas-textColor"
    >
      <h2 className="text-2xl font-semibold text-center mb-4 text-veritas-light">
        {task ? "Editar tarefa" : "Criar nova tarefa"}
      </h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-1 text-veritas-dark"
        >
          Title
        </label>
        <input
          defaultValue={task?.title || ""}
          id="title"
          name="title"
          type="text"
          placeholder="Enter task title"
          className="w-full rounded-lg border border-veritas-dark-green bg-transparent p-2.5 text-veritas-light focus:outline-none focus:ring-2 focus:ring-veritas-dark"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-1 text-veritas-dark"
        >
          Descrição
        </label>
        <textarea
          defaultValue={task?.description || ""}
          id="description"
          name="description"
          placeholder="Descreva a tarefa"
          rows={4}
          className="w-full rounded-lg border border-veritas-dark-green bg-transparent p-2.5 text-veritas-light focus:outline-none focus:ring-2 focus:ring-veritas-dark"
        ></textarea>
      </div>

      {/* Due Date */}
      <div>
        <label
          htmlFor="due_date"
          className="block text-sm font-medium mb-1 text-veritas-dark"
        >
          Data limite
        </label>
        <input
          id="due_date"
          name="due_date"
          type="date"
          defaultValue={new Date().toLocaleDateString("en-CA")}
          className="w-full dark:scheme-dark rounded-lg border border-veritas-dark-green bg-transparent p-2.5 text-veritas-light focus:outline-none focus:ring-2 focus:ring-veritas-dark"
        />
      </div>

      {/* Assigned To */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="assigned_to"
            className="block text-sm font-medium mb-1 text-veritas-dark"
          >
            Atribuida à
          </label>
          <select
            defaultValue={task?.assigned_to || ""}
            name="assigned_to"
            id="assigned_to"
            className="w-full dark:scheme-dark rounded-lg border border-veritas-dark-green bg-transparent p-2.5 text-veritas-light focus:outline-none focus:ring-2 focus:ring-veritas-dark"
          >
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
                selected={task?.assigned_to === user.id}
                className="dark:scheme-dark bg-veritas-backgroundColor"
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full font-semibold py-2.5 rounded-lg transition duration-200 bg-veritas-dark-green text-veritas-light hover:bg-veritas-dark hover:text-veritas-backgroundColor"
        >
          Save Task
        </button>
      </div>
    </form>
  );
}
