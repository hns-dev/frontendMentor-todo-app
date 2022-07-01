import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoListFooter from "./TodoListFooter";

export default function FilterableTodoList() {
  /* ------------------- */
  /* States              */
  /* ------------------- */

  const [todoList, setTodoList] = useState(() => {
    const localData = localStorage.getItem("todoList");
    return localData ? JSON.parse(localData) : [];
  });

  const [filterOption, setFilterOption] = useState("All");

  /* ------------------- */
  /* Effects             */
  /* ------------------- */

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  /* ------------------- */
  /* Functions           */
  /* ------------------- */

  // Add todo to the list
  const handleAddTodo = async (userInputTodo) => {
    setTodoList([...todoList, userInputTodo]);
  };

  // Delete todo from the list
  const handleDeleteTodo = async (title) => {
    setTodoList(todoList.filter((todo) => todo.title !== title));
  };

  // Delete all completed todos
  const handleclearCompleted = () => {
    setTodoList(todoList.filter((todo) => !todo.completed));
  };

  // Update todo's status
  const handleTodoStatus = async (title) => {
    setTodoList(
      todoList.map((todo) =>
        todo.title === title ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Filter todo list
  const filterTodolist = () => {
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

    return todos;
  };

  // handle filter options change
  function handleFilterOptionChange(filterText) {
    setFilterOption(filterText);
  }

  // Handle Drag & Drop feature
  function handleOnDragEnd(result) {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newList = Array.from(todoList);
    const [draggableItem] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, draggableItem);

    setTodoList(newList);
  }

  return (
    <main className="main-content">
      <div className="container">
        <TodoInput onAddTodo={handleAddTodo} />

        <div className="border-radius">
          <TodoList
            onDragEnd={handleOnDragEnd}
            todos={filterTodolist()}
            onDeleteTodo={handleDeleteTodo}
            onTodoStatusChange={handleTodoStatus}
          />
          <TodoListFooter
            todos={todoList}
            onFilterChange={handleFilterOptionChange}
            filterOption={filterOption}
            onCleareCompleted={handleclearCompleted}
          />
        </div>

        <p className="msg msg-margin text-center text-on-surface-dim">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}
