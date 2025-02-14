"use client";
import { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

interface AddTaskProps {
  onAddTask: (task: string, date: string, time: string) => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddTask = () => {
    if (task.trim() === "") return;
    onAddTask(task, date, time);
    setTask("");
    setDate("");
    setTime("");
  };

  return (
    <div className="bg-green-100 p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <p className="text-gray-800 font-semibold">Add a Task</p>
        <input
          type="text"
          placeholder="Enter task..."
          className="flex-1 border rounded-lg p-2 outline-none text-gray-900 placeholder-gray-600"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-700" />
            <input
              type="date"
              className="border rounded-lg p-2 outline-none text-gray-900"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <FaClock className="text-gray-700" />
            <input
              type="time"
              className="border rounded-lg p-2 outline-none text-gray-900"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
