function TeamWorkload({ team }) {
  return (
    <div className="rounded-lg border border-[#e5eaf2] bg-white p-5">
      <h2 className="text-lg font-bold text-[#111827]">Team Workload</h2>
      <p className="mt-1 text-sm text-[#667085]">People with active assignments.</p>
      <div className="mt-5 space-y-3">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between rounded-lg border border-[#edf1f6] p-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-sm font-bold text-[#246bfe]">
                {member.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#111827]">{member.name}</p>
                <p className="truncate text-sm text-[#667085]">{member.role}</p>
              </div>
            </div>
            <span className="rounded-lg bg-[#f5f7fb] px-3 py-1.5 text-sm font-bold text-[#344054]">
              {member.tasks}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamWorkload;
