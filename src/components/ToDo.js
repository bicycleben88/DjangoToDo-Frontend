import React from "react";
import useForm from "../utils/useForm";
import { GlobalContext } from "../App";

export default function Todo() {
  const { globalState } = React.useContext(GlobalContext);
  const { url, token, id } = globalState;
  const { inputs, handleChange, clearForm } = useForm({
    item: "",
    user: id,
  });
  const [todos, setTodos] = React.useState(null);

  const getTodos = async () => {
    const response = await fetch(`${url}/users/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { todos } = await response.json();

    setTodos(todos);
  };

  const createTodo = async (e) => {
    e.preventDefault();

    await fetch(`${url}/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    });

    getTodos();
    clearForm();
  };

  const deleteTodo = async (todo) => {
    await fetch(`${url}/todos/${todo}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getTodos();
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <form onSubmit={createTodo}>
        <label>
          Item:
          <input
            type="text"
            value={inputs.item}
            name="item"
            onChange={handleChange}
          />
        </label>
        <button type="submit" aria-label="create to do">
          Create To Do
        </button>
      </form>
      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.item}
              <button
                type="button"
                aria-label="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
