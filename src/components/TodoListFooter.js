import React from "react";

export default function TodoListFooter({ todoList, onCleareCompleted }) {
  const uncompleted = todoList.filter((todo) => !todo.completed).length;
  return (
    <div className="list-footer row">
      <p className="acitve-todos-count">{uncompleted} items left</p>
      <button onClick={() => onCleareCompleted()}>Clear Completed</button>
    </div>
  );
}
