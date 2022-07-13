import React, { useState, useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoListFooter from "./TodoListFooter";

export default function FilterableTodoList() {
  /* ------------------- */
  /* States              */
  /* ------------------- */
  const { todos, dispatch } = useTodosContext();

  // const [todoList, setTodoList] = useState(() => {
  //   const localData = localStorage.getItem("todoList");
  //   return localData ? JSON.parse(localData) : [];
  // });

  const [filterOption, setFilterOption] = useState("All");

  /* ------------------- */
  /* Effects             */
  /* ------------------- */
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      const json = await response.json();

      if (response.ok) dispatch({ type: "SET_TODOS", payload: json });
    };

    fetchTodos();
  }, [dispatch]);

  // useEffect(() => {
  //   localStorage.setItem("todoList", JSON.stringify(todoList));
  // }, [todoList]);

  /* ------------------- */
  /* Functions           */
  /* ------------------- */

  // Add todo to the list
  // const handleAddTodo = async (userInputTodo) => {
  //   setTodoList([...todoList, userInputTodo]);
  // };

  // Delete todo from the list
  // const handleDeleteTodo = async (title) => {
  //   setTodoList(todoList.filter((todo) => todo.title !== title));
  // };

  // Delete all completed todos
  // const handleclearCompleted = () => {
  //   setTodoList(todoList.filter((todo) => !todo.completed));
  // };

  // Update todo's status
  // const handleTodoStatus = async (title) => {
  //   setTodoList(
  //     todoList.map((todo) =>
  //       todo.title === title ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };

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

    const newList = Array.from(todos);
    const [draggableItem] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, draggableItem);

    dispatch({ type: "SET_TODOS", payload: newList });
    // setTodoList(newList);
  }

  return (
    <main className="main-content">
      <div className="container">
        <TodoInput />

        <TodoList
          onDragEnd={handleOnDragEnd}
          todos={todos}
          filterOption={filterOption}
        />
        <TodoListFooter
          todos={todos}
          onFilterChange={handleFilterOptionChange}
          filterOption={filterOption}
        />

        <p className="msg msg-margin text-center text-on-surface-dim">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}
