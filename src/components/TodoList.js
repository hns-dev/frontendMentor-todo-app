import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Todo from "./Todo";

export default function TodoList({
  todoList,
  todos,
  onDeleteTodo,
  onCompletedTodo,
  onCleareCompleted,
}) {
  // const [filterOption, setFilterOption] = useState("All");
  // let todos = [];

  // todoList.forEach((todo) => {
  //   if (filterOption === "Active") {
  //     todos = todoList.filter((todo) => !todo.completed);
  //   } else if (filterOption === "Completed") {
  //     todos = todoList.filter((todo) => todo.completed);
  //   } else {
  //     todos = [...todoList];
  //   }
  // });

  // function handleFilterOptionChange(filterText) {
  //   setFilterOption(filterText);
  // }

  return (
    // <div>
    //   <div className="dark-bg todolist">
    <>
      {todos.length > 0
        ? todos.map((todo, index) => (
            <Draggable key={todo.title} draggableId={todo.title} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Todo
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onCompletedTodo={onCompletedTodo}
                  />
                </div>
              )}
            </Draggable>
          ))
        : "Your todo list is empty!"}
    </>
  );
}
