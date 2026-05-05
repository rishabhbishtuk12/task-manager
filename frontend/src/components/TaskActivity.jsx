import { completionRate } from "../utils/taskUtils";

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

function TaskActivity({ tasks, weeklyActivity }) {
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = tasks.filter(task => task.status === "in_progress").length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const totalTasks = tasks.length;
  const completedPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressPercent = totalTasks ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const pendingPercent = totalTasks ? Math.round((pendingTasks / totalTasks) * 100) : 0;

  return (
    <div className="rounded-lg border border-[#e5eaf2] bg-white p-5">
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

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="flex items-center justify-center">
          <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#22c55e_0_25%,#246bfe_25%_58%,#f59e0b_58%_100%)]">
            <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
              <span className="text-3xl font-extrabold text-[#111827]">{totalTasks}</span>
              <span className="mt-1 text-sm font-medium text-[#667085]">total tasks</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ProgressRow label="Completed" value={`${completedTasks} tasks`} percent={completedPercent} color="bg-[#22c55e]" />
          <ProgressRow label="In Progress" value={`${inProgressTasks} tasks`} percent={inProgressPercent} color="bg-[#246bfe]" />
          <ProgressRow label="Pending" value={`${pendingTasks} tasks`} percent={pendingPercent} color="bg-[#f59e0b]" />
          <div className="grid grid-cols-7 items-end gap-2 pt-3">
            {weeklyActivity.map((height, index) => (
              <div key={index} className="flex h-28 items-end rounded-lg bg-[#f2f5fa] px-1.5">
                <div
                  className="w-full rounded-md bg-[#246bfe]"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#98a2b3]">
            {weekDays.map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>
        </div>
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
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default TaskActivity;
