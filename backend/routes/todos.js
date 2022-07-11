const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  deleteCompletedTodos,
  updateTodo,
} = require("../controllers/todoController");

const router = express.Router();

// GET all todos
router.get("/", getTodos);

// POST a new todo
router.post("/", createTodo);

// DELETE a todo
router.delete("/:id", deleteTodo);

// DELETE completed todos
router.delete("/", deleteCompletedTodos);

// UPDATE a todo
router.patch("/:id", updateTodo);

module.exports = router;
