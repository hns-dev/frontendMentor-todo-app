import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Mode from "./components/Mode";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoListFooter from "./components/TodoListFooter";
import FilterList from "./components/FilterList";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  // ################### States ###################

  const { darkMode, setDarkMode } = useDarkMode("body");

  const [todoList, setTodoList] = useState(() => {
    const localData = localStorage.getItem("todoList");
    return localData ? JSON.parse(localData) : [];
  });

  const [filterOption, setFilterOption] = useState("All");

  // ################### Effects ###################

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // ################### Functions ###################

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

  // Update todo's completed value
  const handleCompletedTodo = async (title) => {
    setTodoList(
      todoList.map((todo) =>
        todo.title === title ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Update dark mode setting
  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  // Filtering todo list
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
    const { destination, source, draggableId } = result;

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
    <>
      <header>
        <div className="container row">
          <h1 className="heading">todo</h1>
          <Mode darkMode={darkMode} onDarkModeChange={handleDarkModeChange} />
        </div>
      </header>

      <main>
        <div className="container">
          {/* Form - input */}
          <TodoInput onAddTodo={handleAddTodo} />

          {/* Todolist container */}
          <div className="dark-bg todolist list-container">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="dropList">
                {(provided) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="todo-list"
                  >
                    <TodoList
                      todoList={todoList}
                      todos={filterTodolist()}
                      onDeleteTodo={handleDeleteTodo}
                      onCompletedTodo={handleCompletedTodo}
                    />
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            {/* TodoList Footer */}
            <TodoListFooter
              todoList={todoList}
              onCleareCompleted={handleclearCompleted}
            />
          </div>

          {/* Filter Options */}
          <FilterList
            onfilterChange={handleFilterOptionChange}
            filterOption={filterOption}
          />

          <p className="drag-drop">Drag and drop to reorder list</p>
        </div>
      </main>
    </>
  );
}

export default App;
