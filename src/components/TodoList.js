import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Todo from "./Todo";

export default function TodoList({ onDragEnd, todos, filterOption }) {
  // Filter todo list
  const filterTodolist = () => {
    let filteredTodos = [];

    if (todos) {
      todos.forEach((todo) => {
        if (filterOption === "Active") {
          filteredTodos = todos.filter((todo) => !todo.completed);
        } else if (filterOption === "Completed") {
          filteredTodos = todos.filter((todo) => todo.completed);
        } else {
          filteredTodos = [...todos];
        }
      });
    }

    return filteredTodos;
  };

  const filteredTodos = filterTodolist();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dropList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list surface-color"
          >
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo, index) => (
                <Todo key={todo._id} index={index} todo={todo} />
              ))
            ) : (
              <p className="msg text-center">Your list is empty!</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
