const express = require("express");
const AuthMiddleware = require("../../middleware/authMiddleware");
const {
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
} = require("./todo.controller");
const todoRouter = express.Router();

todoRouter.get("/", AuthMiddleware, getTodo);
todoRouter.post("/", AuthMiddleware, postTodo);
todoRouter.put("/:id", AuthMiddleware, updateTodo);
todoRouter.delete("/:id", AuthMiddleware, deleteTodo);

module.exports = todoRouter;
