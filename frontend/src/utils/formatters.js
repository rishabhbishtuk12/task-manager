export function formatStatus(status) {
  const map = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  return map[status] || status || "Pending";
}

export function formatPriority(priority) {
  if (!priority) {
    return "Medium";
  }

  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function formatDueDate(date) {
  if (!date) {
    return "No due date";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

export function normalizeTask(task) {
  const assignedUsers = Array.isArray(task.assignedTo) ? task.assignedTo : [];
  const primaryOwner = assignedUsers[0];

  return {
    id: task._id || task.id,
    title: task.title,
    description: task.description || "No description added yet.",
    owner: primaryOwner?.name || task.owner || "Unassigned",
    ownerId: primaryOwner?._id || "",
    status: task.status || "pending",
    priority: task.priority || "medium",
    due: task.dueDate || task.due,
    checklist: Array.isArray(task.todos)
      ? task.todos.map(item => item.text || item)
      : task.checklist || [],
    raw: task,
  };
}
