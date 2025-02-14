"use client";
import {
  FaStar,
  FaCheckSquare,
  FaRegSquare,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

interface TaskItemProps {
  task: {
    _id: string;
    userId: string;
    text: string;
    date: string;
    time: string;
    isCompleted: boolean;
    isImportant: boolean;
  };
  toggleCompleteHandler: (id: string) => void;
  toggleImportantHandler: (id: string) => void;
  deleteTaskHandler: (id: string) => void; // Function to delete task
}

export default function TaskItem({
  task,
  toggleCompleteHandler,
  toggleImportantHandler,
  deleteTaskHandler,
}: TaskItemProps) {
  const today = new Date().toLocaleDateString("en-CA");
  return (
    <div className="flex items-center justify-between p-3 mb-2 border-b last:border-none bg-gray-100 rounded-lg">
      <div className="flex items-center space-x-3">
        <button onClick={() => toggleCompleteHandler(task._id)}>
          {task.isCompleted ? (
            <FaCheckSquare className="text-green-500 text-xl" />
          ) : (
            <FaRegSquare className="text-gray-500 text-xl" />
          )}
        </button>

        <div>
          <p
            className={`text-gray-900 ${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.text}
          </p>
          <p className="text-xs text-gray-500">
            {task.date === today ? "Today" : task.date} at {task.time}
          </p>{" "}
        </div>
      </div>

      <div className="flex space-x-3">
        <button onClick={() => toggleImportantHandler(task._id)}>
          <FaStar
            className={`text-xl ${
              task.isImportant ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        </button>

        <button onClick={() => deleteTaskHandler(task._id)}>
          <FaTrash className="text-red-500 text-xl hover:text-red-700 transition" />
        </button>
      </div>
    </div>
  );
}
