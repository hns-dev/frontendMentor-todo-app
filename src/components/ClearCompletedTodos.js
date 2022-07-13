import React from "react";
import { useTodosContext } from "../hooks/useTodosContext";

export default function ClearCompletedTodos() {
  const { dispatch } = useTodosContext();

  const handleCleareCompletedTodos = async () => {
    const response = await fetch("/api/todos", {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) dispatch({ type: "DELETE_COMPLETED_TODOS" });
  };

  return (
    <button
      className="btn btn-clear-completed-todos surface-color padding-y"
      onClick={() => handleCleareCompletedTodos()}
    >
      Clear Completed
    </button>
  );
}
