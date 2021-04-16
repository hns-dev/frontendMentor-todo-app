import React from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import Mode from "./Mode";
import FilterList from "./FilterList";

export default function header({ todoList }) {
  return (
    <header>
      <div className="container">
        <div className="heading row">
          <h1>todo</h1>
          <Mode />
        </div>

        <TodoInput />

        <TodoList todoList={todoList} />

        <FilterList />

        <p className="drag-drop">Drag and drop to reorder list</p>
      </div>
    </header>
  );
}
