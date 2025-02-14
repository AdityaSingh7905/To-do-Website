"use client";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  userId: string;
  text: string;
  date: string;
  time: string;
  isCompleted: boolean;
  isImportant: boolean;
}

interface TaskListProps {
  initialTasks: Task[];
  token: string | null;
  category: string;
  onDeleteTask: (id: string) => void;
  onfetchTodo: () => void;
}

export default function TaskList({
  initialTasks,
  token,
  category,
  onDeleteTask,
  onfetchTodo,
}: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  console.log(tasks);

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find((task) => task._id === id);
    if (updatedTask) {
      updateTask(id, "isCompleted", updatedTask.isCompleted);
    }
  };

  const toggleImportant = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id
        ? {
            ...task,
            isImportant: !task.isImportant,
          }
        : task
    );
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find((task) => task._id === id);
    if (updatedTask) {
      updateTask(id, "isImportant", updatedTask.isImportant);
    }
  };

  const updateTask = async (id: string, field: string, fieldVal: boolean) => {
    if (!token) {
      console.error("No token available. Cannot update task.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          field,
          fieldVal,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Failed to update ToDo");
      }
      onfetchTodo();
    } catch (err) {
      console.log("Error updating Todo:", err);
    }
  };

  const onDeleteTaskHandler = (id: string) => {
    onDeleteTask(id);
  };

  const filteredTasks = tasks.filter((task) => {
    // Get current date in YYYY-MM-DD format
    const today = new Date().toLocaleDateString("en-CA");
    console.log(today);
    if (category === "All Tasks") {
      return true; // Show all tasks
    } else if (category === "Today") {
      return task.date === today; // Show only today's tasks
    } else if (category === "Important") {
      return task.isImportant; // Show only important tasks
    } else if (category === "Planned") {
      return new Date(task.date).getTime() > new Date(today).getTime(); // Show future tasks
    } else if (category === "Completed") {
      return task.isCompleted;
    }

    return true;
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-[74vh] flex flex-col">
      <h2 className="text-gray-900 text-lg font-semibold mb-2">{category}</h2>

      <div className="overflow-y-auto flex-1 pr-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              toggleCompleteHandler={toggleComplete}
              toggleImportantHandler={toggleImportant}
              deleteTaskHandler={onDeleteTaskHandler}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}
