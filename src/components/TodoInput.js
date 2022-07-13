import React, { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";

export default function TodoInput() {
  const { dispatch } = useTodosContext();
  const [todoInput, setTodoInput] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todoInput) {
      alert("Please add a todo");
      return;
    }

    const todo = { content: todoInput, completed: false };

    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) setError(json.error);

    if (response.ok) {
      setError(null);
      setTodoInput("");
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control flex surface-color padding">
        <div className="checkmark">
          <div className="checkmark-inner"></div>
        </div>

        <input
          type="text"
          placeholder="Create a new todo..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </div>
    </form>
  );
}
