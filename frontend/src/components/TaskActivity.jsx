import { completionRate } from "../utils/taskUtils";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "60%",
  plugins: {
    legend: { position: "top" },
  },
};

function TaskActivity({ tasks, weeklyActivity }) {
  const completedTasks = tasks.filter(
    task => task.status === "completed",
  ).length;
  const inProgressTasks = tasks.filter(
    task => task.status === "in_progress",
  ).length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const totalTasks = tasks.length;
  const completedPercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  const inProgressPercent = totalTasks
    ? Math.round((inProgressTasks / totalTasks) * 100)
    : 0;
  const pendingPercent = totalTasks
    ? Math.round((pendingTasks / totalTasks) * 100)
    : 0;
  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [pendingPercent, inProgressPercent, completedPercent],
        backgroundColor: ["#f59e0b", "#246bfe", "#22c55e"],
        borderColor: ["#f59e0b", "#246bfe", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="rounded-lg border border-[#e5eaf2] bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#111827]">Task Activity</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Status distribution and weekly completion trend.
          </p>
        </div>
        <span className="rounded-lg bg-[#eef4ff] px-3 py-2 text-sm font-semibold text-[#246bfe]">
          {completionRate(tasks)}% complete
        </span>
      </div>

      <div className="mt-6 grid gap-6">
        <div className="grid grid-cols-1">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <ProgressRow
          label="Completed"
          value={`${completedTasks} tasks`}
          percent={completedPercent}
          color="bg-[#22c55e]"
        />
        <ProgressRow
          label="In Progress"
          value={`${inProgressTasks} tasks`}
          percent={inProgressPercent}
          color="bg-[#246bfe]"
        />
        <ProgressRow
          label="Pending"
          value={`${pendingTasks} tasks`}
          percent={pendingPercent}
          color="bg-[#f59e0b]"
        />
        <div className="space-y-4"></div>
      </div>
    </div>
  );
}

function ProgressRow({ label, value, percent, color }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-[#344054]">{label}</span>
        <span className="font-medium text-[#667085]">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-[#edf1f6]">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default TaskActivity;
