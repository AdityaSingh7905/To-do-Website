"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("My Day");
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    console.log("Token from localStorage:", savedToken);
    // if (savedToken) {
    //   fetchTodo(savedToken);
    // }
  }, []); // Runs once when component mounts

  useEffect(() => {
    if (token) {
      fetchTodo();
    }
  }, [token]);

  const fetchTodo = async () => {
    if (!token) {
      console.error("No token found, user might not be logged in");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch tasks!!");
      }
      const data = await res.json();
      setTasks(data);
      console.log(data);
    } catch (err) {
      console.log("Error fetching tasks", err);
    }
  };

  const addTask = async (task: string, date: string, time: string) => {
    if (!token) {
      console.error("No token found, user might not be logged in");
      return;
    }

    let newTask = {
      text: task,
      date: date,
      time: time,
    };
    console.log(newTask);
    const res = await fetch("http://localhost:8000/api/todos", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    if (res.status == 401) {
      console.log("Unauthorized! Check your token.");
    }
    if (res.ok) {
      console.log("Task is added successfully!!");
      // fetching todos
      fetchTodo();
    } else {
      console.error("Failed to add task!!");
    }
  };

  const deleteTask = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return; // Prevent accidental deletion

    try {
      const res = await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      // Remove task from state after successful deletion
      setTasks(tasks.filter((task: { _id: string }) => task._id !== id));
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveCategory={setActiveCategory} tasks={tasks} />

      <div className="flex-1 flex flex-col">
        <AddTask onAddTask={addTask} />

        <div className="flex-1 p-6">
          <TaskList
            initialTasks={tasks}
            token={token}
            category={activeCategory}
            onDeleteTask={deleteTask}
            onfetchTodo={fetchTodo}
          />
        </div>
      </div>
    </div>
  );
}
