import React, { useState } from "react";
import Mode from "./components/Mode";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
// import FilterList from "./components/FilterList";

function App() {
  const [todoList, setTodoList] = useState([
    { title: "Complete online JavaScript course", completed: true },
    { title: "Jog around the park 3x", completed: false },
    { title: "10 minuts meditaiton", completed: false },
    { title: "Read for 1 hour", completed: false },
    { title: "Pick up groceries", completed: false },
    { title: "Complete Todo App on Frontend Mentor", completed: false },
  ]);

  const [darkMode, setDarkMode] = useState(false);

  function handleAddTodo(title) {
    const newTodo = { title: title, completed: false };
    setTodoList([...todoList, newTodo]);
  }

  function handleDeleteTodo(title) {
    setTodoList(todoList.filter((todo) => todo.title !== title));
  }

  function handleCompletedTodo(title, completed) {
    setTodoList(
      todoList.map((todo) =>
        todo.title === title ? { title: title, completed: completed } : todo
      )
    );
  }

  function handleclearCompleted() {
    setTodoList(todoList.filter((todo) => !todo.completed));
  }

  function handleDarkModeChange() {
    setDarkMode(!darkMode);
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

        {/* Todo List */}
        <TodoList
          todoList={todoList}
          onDeleteTodo={handleDeleteTodo}
          onCompletedTodo={handleCompletedTodo}
          onCleareCompleted={handleclearCompleted}
        />

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
