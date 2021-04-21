import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Mode from "./components/Mode";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoListFooter from "./components/TodoListFooter";
import FilterList from "./components/FilterList";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getTodoList = async () => {
      const todoListFromServer = await fetchTodoList();
      setTodoList(todoListFromServer);
    };

    getTodoList();
  }, []);

  // Fetch todolist
  const fetchTodoList = async () => {
    const res = await fetch("http://localhost:5000/todoList");
    const data = await res.json();

    return data;
  };

  // Fetch a todo
  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todoList/${id}`);
    const data = await res.json();

    return data;
  };

  // Add todo to the list
  const handleAddTodo = async (userInputTodo) => {
    const res = await fetch("http://localhost:5000/todoList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInputTodo),
    });
    const data = await res.json();

    setTodoList([...todoList, data]);

    // const newTodo = userInputTodo;
    // setTodoList([...todoList, newTodo]);
  };

  // Delete a todo from the list
  const handleDeleteTodo = async (id) => {
    deleteTodo(id);
    // await fetch(`http://localhost:5000/todoList/${id}`, {
    //   method: "DELETE",
    // });

    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todoList/${id}`, {
      method: "DELETE",
    });
  };

  async function handleclearCompleted() {
    // const data = await fetchTodoList();

    // data.forEach((todo) => {
    //   if (todo.completed) {
    //     console.log(todo);
    //     // deleteTodo(todo.id);
    //   }
    // });

    setTodoList(todoList.filter((todo) => !todo.completed));
  }

  // Update todo's completed value
  async function handleCompletedTodo(id) {
    const todoToUpdate = await fetchTodo(id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    const res = await fetch(`http://localhost:5000/todoList/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    const data = await res.json();

    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: data.completed } : todo
      )
    );
  }

  // Delete all completed todos

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
