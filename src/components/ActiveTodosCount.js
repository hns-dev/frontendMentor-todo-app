import React from "react";

export default function ActiveTodosNumber({ todos }) {
  const activeTodos = todos
    ? todos.filter((todo) => !todo.completed).length
    : 0;
  return (
    <p className="active-todos-count surface-color padding-y">
      {activeTodos}
      {activeTodos > 1 ? " items" : " item"} left
    </p>
  );
}
