import { formatDueDate, formatPriority, formatStatus } from "../utils/formatters";

function RecentTasks({ tasks }) {
  return (
    <section className="mt-5 rounded-lg border border-[#e5eaf2] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eaf2] px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-[#111827]">Recent Tasks</h2>
          <p className="mt-1 text-sm text-[#667085]">Latest work across the project board.</p>
        </div>
        <button
          className="rounded-lg border border-[#dce3ee] bg-white px-4 py-2 text-sm font-semibold text-[#344054]"
          type="button"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#f8fafc] text-xs uppercase text-[#667085]">
            <tr>
              <th className="px-5 py-3 font-bold">Task</th>
              <th className="px-5 py-3 font-bold">Owner</th>
              <th className="px-5 py-3 font-bold">Status</th>
              <th className="px-5 py-3 font-bold">Priority</th>
              <th className="px-5 py-3 font-bold">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf1f6]">
            {tasks.map((task) => (
              <tr key={task.title}>
                <td className="px-5 py-4 font-semibold text-[#111827]">{task.title}</td>
                <td className="px-5 py-4 text-[#475467]">{task.owner}</td>
                <td className="px-5 py-4">
                  <StatusPill status={task.status} />
                </td>
                <td className="px-5 py-4 text-[#475467]">{formatPriority(task.priority)}</td>
                <td className="px-5 py-4 text-[#475467]">{formatDueDate(task.due)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusPill({ status }) {
  const styles = {
    completed: "bg-[#ecfdf3] text-[#159947]",
    pending: "bg-[#fff7e8] text-[#b77900]",
    in_progress: "bg-[#eef4ff] text-[#246bfe]",
  };

  return (
    <span className={`rounded-lg px-3 py-1.5 text-sm font-bold ${styles[status]}`}>
      {formatStatus(status)}
    </span>
  );
}

export default RecentTasks;
