import React, { useState } from "react";
import Todo from "./Todo";
import TodoListFooter from "./TodoListFooter";
import FilterList from "./FilterList";

export default function TodoList({
  todoList,
  onDeleteTodo,
  onCompletedTodo,
  onCleareCompleted,
}) {
  const [filterOption, setFilterOption] = useState("All");
  let todos = [];

  todoList.forEach((todo) => {
    if (filterOption === "Active") {
      todos = todoList.filter((todo) => !todo.completed);
    } else if (filterOption === "Completed") {
      todos = todoList.filter((todo) => todo.completed);
    } else {
      todos = [...todoList];
    }
  });

  function handleFilterOptionChange(filterText) {
    setFilterOption(filterText);
  }

  return (
    <div>
      <div className="dark-bg todolist">
        {todos.map((todo) => (
          <Todo
            key={todo.title}
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onCompletedTodo={onCompletedTodo}
          />
        ))}

        <TodoListFooter
          todoList={todoList}
          onCleareCompleted={onCleareCompleted}
        />
      </div>

      {/* Filter Options */}
      <FilterList onfilterChange={handleFilterOptionChange} />
    </div>
  );
}
