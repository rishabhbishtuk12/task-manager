export function buildTaskStats(tasks) {
  const completed = tasks.filter(task => task.status === "completed").length;
  const pending = tasks.filter(task => task.status === "pending").length;
  const inProgress = tasks.filter(task => task.status === "in_progress").length;

  return [
    {
      label: "Total Tasks",
      value: String(tasks.length),
      change: `${pending} pending & ${inProgress} in progress`,
      tone: "blue",
    },
    {
      label: "Pending",
      value: String(pending),
      change: `${highPriorityCount(tasks)} high priority`,
      tone: "amber",
    },
    {
      label: "In Progress",
      value: String(inProgress),
      change: "Active execution",
      tone: "violet",
    },
    {
      label: "Completed",
      value: String(completed),
      change: `${completionRate(tasks)}% completion`,
      tone: "green",
    },
  ];
}

export function completionRate(tasks) {
  if (tasks.length === 0) {
    return 0;
  }

  const completed = tasks.filter(task => task.status === "completed").length;
  return Math.round((completed / tasks.length) * 100);
}

export function highPriorityCount(tasks) {
  return tasks.filter(task => task.priority === "High").length;
}

export function filterTasks(tasks, filter) {
  if (filter === "All") {
    return tasks;
  }

  const normalizedFilter = {
    Pending: "pending",
    "In Progress": "in_progress",
    Completed: "completed",
  }[filter];

  return tasks.filter(task => task.status === normalizedFilter);
}
