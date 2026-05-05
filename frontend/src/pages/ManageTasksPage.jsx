import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { filterTasks } from "../utils/taskUtils";
import { formatDueDate, formatPriority, formatStatus } from "../utils/formatters";

const filters = ["All", "Pending", "In Progress", "Completed"];

function ManageTasksPage() {
  const { dataError, isLoading, tasks } = useTasks();
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleTasks = filterTasks(tasks, activeFilter);

  return (
    <section>
      <PageTitle
        title="Manage Tasks"
        description="Track assigned work by status, priority, owner, and due date."
      />

      {dataError && (
        <p className="mt-4 rounded-lg bg-[#fff7e8] px-3 py-2 text-sm font-semibold text-[#b77900]">
          {dataError}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className={[
              "rounded-lg px-4 py-2 text-sm font-bold transition",
              activeFilter === filter
                ? "bg-[#246bfe] text-white"
                : "border border-[#dce3ee] bg-white text-[#475467]",
            ].join(" ")}
            type="button"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <p className="rounded-lg border border-[#e5eaf2] bg-white p-5 text-sm font-semibold text-[#667085]">
            Loading tasks...
          </p>
        ) : visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

function TaskCard({ task }) {
  return (
    <article className="rounded-lg border border-[#e5eaf2] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#246bfe]">{formatPriority(task.priority)}</p>
          <h2 className="mt-2 text-lg font-bold text-[#111827]">{task.title}</h2>
        </div>
        <span className="rounded-lg bg-[#f5f7fb] px-3 py-1.5 text-sm font-bold text-[#475467]">
          {formatStatus(task.status)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#667085]">{task.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="font-semibold text-[#344054]">{task.owner}</span>
        <span className="font-medium text-[#667085]">{formatDueDate(task.due)}</span>
      </div>
      <div className="mt-4 space-y-2">
        {task.checklist.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-[#667085]">
            <span className="h-2 w-2 rounded-full bg-[#246bfe]" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function PageTitle({ title, description }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-[#667085]">{description}</p>
    </div>
  );
}

export default ManageTasksPage;
