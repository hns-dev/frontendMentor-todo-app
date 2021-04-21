import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Mode from "./components/Mode";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoListFooter from "./components/TodoListFooter";
import FilterList from "./components/FilterList";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const localData = localStorage.getItem("darkMode");
    return localData ? JSON.parse(localData) : false;
  });

  // Set & Update Local Storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // const [todoList, setTodoList] = useState([]);

  const [todoList, setTodoList] = useState(() => {
    const localData = localStorage.getItem("todoList");
    return localData ? JSON.parse(localData) : [];
  });

  // Set & Update Local Storage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Add todo to the list
  const handleAddTodo = async (userInputTodo) => {
    setTodoList([...todoList, userInputTodo]);
  };

  // Delete a todo from the list
  const handleDeleteTodo = async (title) => {
    setTodoList(todoList.filter((todo) => todo.title !== title));
  };

  // Delete all completed todos
  function handleclearCompleted() {
    setTodoList(todoList.filter((todo) => !todo.completed));
  }

  // Update todo's completed value
  async function handleCompletedTodo(title) {
    setTodoList(
      todoList.map((todo) =>
        todo.title === title ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Update dark mode setting
  function handleDarkModeChange() {
    setDarkMode(!darkMode);
  }

  // Lifting state up
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
    <main>
      <div className="container">
        {/* Header */}
        <header className="heading row">
          <h1>todo</h1>
          <Mode darkMode={darkMode} onDarkModeChange={handleDarkModeChange} />
        </header>

        {/* Form - input */}
        <TodoInput onAddTodo={handleAddTodo} />

        <div>
          <div className="dark-bg todolist">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="dropList">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TodoList
                      todoList={todoList}
                      todos={todos}
                      onDeleteTodo={handleDeleteTodo}
                      onCompletedTodo={handleCompletedTodo}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* TodoList Footer */}
            <TodoListFooter
              todoList={todoList}
              onCleareCompleted={handleclearCompleted}
            />
          </div>
          <FilterList onfilterChange={handleFilterOptionChange} />
        </div>

        {/* Todo List */}
        {/* <TodoList
          todoList={todoList}
          onDeleteTodo={handleDeleteTodo}
          onCompletedTodo={handleCompletedTodo}
          onCleareCompleted={handleclearCompleted}
        /> */}

        {/* Filter Options */}
        {/* <FilterList /> */}

        <p className="drag-drop">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;

/*
Todo

  <!-- Add dynamic number --> items left

  All
  Active 
  Completed

  Clear Completed

  Drag and drop to reorder list
*/
