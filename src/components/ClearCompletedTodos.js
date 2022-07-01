import React from "react";

export default function ClearCompletedTodos({ onCleareCompleted }) {
  return (
    <button
      className="btn btn-clear-completed-todos surface-color padding-y"
      onClick={() => onCleareCompleted()}
    >
      Clear Completed
    </button>
  );
}
