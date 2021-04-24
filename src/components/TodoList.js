import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Todo from "./Todo";

export default function TodoList({ todos, onDeleteTodo, onCompletedTodo }) {
  return (
    <>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <Draggable key={todo.title} draggableId={todo.title} index={index}>
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="todo-item"
              >
                <Todo
                  todo={todo}
                  onDeleteTodo={onDeleteTodo}
                  onCompletedTodo={onCompletedTodo}
                />
              </li>
            )}
          </Draggable>
        ))
      ) : (
        <p className="display-msg">There's nothing to show!</p>
      )}
    </>
  );
}
