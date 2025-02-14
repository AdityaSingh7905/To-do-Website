import { FaBell, FaRegCalendarAlt, FaCog } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-purple-600 text-white p-4 shadow-md">
      <h1 className="text-xl font-bold">To Do</h1>

      <div className="flex items-center bg-white text-black px-3 py-2 rounded-lg w-1/3">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full outline-none bg-transparent"
        />
      </div>

      <div className="flex items-center space-x-4">
        <FaBell className="text-xl cursor-pointer hover:text-gray-300" />
        <FaRegCalendarAlt className="text-xl cursor-pointer hover:text-gray-300" />
        <FaCog className="text-xl cursor-pointer hover:text-gray-300" />
      </div>
    </div>
  );
}
