const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { mongoConnect } = require("./config/db");
const userRouter = require("./routes/user/user.router");
const todoRouter = require("./routes/todo/todo.router");

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// connect to database
mongoConnect();

// api routes
app.use("/api/auth", userRouter);
app.use("/api/todos", todoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});