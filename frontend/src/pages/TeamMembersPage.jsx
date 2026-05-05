import { useTasks } from "../context/TaskContext";

function TeamMembersPage() {
  const { tasks, team } = useTasks();

  return (
    <section>
      <div>
        <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">Team Members</h1>
        <p className="mt-2 text-sm text-[#667085]">
          Review team capacity and current task ownership.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {team.map((member) => {
          const assignedTasks = tasks.filter((task) => task.owner === member.name);
          const completed =
            member.completedTasks ??
            assignedTasks.filter((task) => task.status === "completed").length;
          const pending = member.pendingTasks ?? assignedTasks.length - completed;

          return (
            <article
              key={member.name}
              className="rounded-lg border border-[#e5eaf2] bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eef4ff] font-bold text-[#246bfe]">
                  {member.initials}
                </span>
                <div>
                  <h2 className="font-bold text-[#111827]">{member.name}</h2>
                  <p className="text-sm text-[#667085]">{member.role}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <Metric
                  label="Tasks"
                  value={
                    member.pendingTasks !== undefined
                      ? member.pendingTasks + member.inProgressTasks + member.completedTasks
                      : assignedTasks.length
                  }
                />
                <Metric label="Done" value={completed} />
                <Metric label="Open" value={pending + (member.inProgressTasks || 0)} />
              </div>

              <div className="mt-5 space-y-2">
                {assignedTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg bg-[#f8fafc] px-3 py-2 text-sm font-medium text-[#475467]"
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-[#f8fafc] p-3">
      <p className="text-lg font-extrabold text-[#111827]">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase text-[#98a2b3]">{label}</p>
    </div>
  );
}

export default TeamMembersPage;
