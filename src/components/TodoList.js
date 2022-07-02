import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Todo from "./Todo";

export default function TodoList({
  onDragEnd,
  todos,
  onDeleteTodo,
  onTodoStatusChange,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dropList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list surface-color"
          >
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <Todo
                  key={todo.title}
                  index={index}
                  todo={todo}
                  onDeleteTodo={onDeleteTodo}
                  onTodoStatusChange={onTodoStatusChange}
                />
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
