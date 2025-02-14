import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface Task {
  _id: string;
  userId: string;
  text: string;
  date: string;
  time: string;
  isCompleted: boolean;
  isImportant: boolean;
}

interface TaskChartProps {
  tasks: Task[];
}

const TaskChart = ({ tasks }: TaskChartProps) => {
  //Today's date in YYYY-MM-DD format (local system time)
  const today = new Date().toLocaleDateString("en-CA");

  const todaysTasks = tasks.filter((task) => task.date === today);
  const completedTasks = todaysTasks.filter((task) => task.isCompleted).length;
  const pendingTasks = todaysTasks.length - completedTasks;

  const data = [
    { name: "Completed", value: completedTasks, color: "#4CAF50" },
    { name: "Pending", value: pendingTasks, color: "#FFC107" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full flex flex-col items-center border border-gray-200 mt-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Today's Overview
      </h2>
      {todaysTasks.length > 0 ? (
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            startAngle={90}
            endAngle={450}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p className="text-gray-500 text-sm">No tasks for today.</p>
      )}
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Total({todaysTasks.length})
      </h2>
    </div>
  );
};

export default TaskChart;
