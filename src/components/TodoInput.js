import React, { useState } from "react";

export default function TodoInput({ onAddTodo }) {
  const [todoInput, setTodoInput] = useState("");

  function onFormSubmit(e) {
    e.preventDefault();

    if (!todoInput) {
      alert("Please add a todo");
      return;
    }

    onAddTodo({ title: todoInput, completed: false });

    setTodoInput("");
  }

  return (
    <form onSubmit={onFormSubmit}>
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
