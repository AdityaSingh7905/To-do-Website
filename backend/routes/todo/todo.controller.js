const Todo = require("../../models/todo.model");

async function getTodo(req, res) {
  try {
    // Fetching only the logged-in user's tasks
    const todos = await Todo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
}

async function postTodo(req, res) {
  console.log(req.body);
  try {
    const { text, date, time } = req.body;
    const todo = new Todo({
      userId: req.user.userId,
      text,
      date,
      time,
      isCompleted: false,
      isImportant: false,
    });
    await todo.save();
    res.status(201).json({ message: "Task added successfully", task: todo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding task!!", error: err.message });
  }
}

async function updateTodo(req, res) {
  try {
    const todoId = req.params.id;
    const { field, fieldVal } = req.body;

    const allowedFields = ["isImportant", "isCompleted"];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: "Invalid field update" });
    }

    // Find and update ToDo
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { [field]: fieldVal },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "ToDo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating ToDo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteTodo(req, res) {
  try {
    const todoId = req.params.id;
    const userId = req.user.userId;

    // Find the todo by ID and check if it belongs to the logged-in user
    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await Todo.findByIdAndDelete(todoId);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
};
