import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { filterTasks } from "../utils/taskUtils";
import {
  formatDueDate,
  formatPriority,
  formatStatus,
} from "../utils/formatters";

const filters = ["All", "Pending", "In Progress", "Completed"];

function ManageTasksPage() {
  const {
    dataError,
    isLoading,
    tasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks();
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    due: "",
    priority: "medium",
  });

  const visibleTasks = filterTasks(tasks, activeFilter);

  const startEdit = task => {
    setEditingTaskId(task.id);

    setEditForm({
      title: task.title,
      description: task.description || "",
      assignedTo: task.assignedTo || "",
      due: task.due ? new Date(task.due).toISOString().split("T")[0] : "",
      priority: task.priority || "medium",
    });
  };

  const saveEdit = async taskId => {
    await updateTask(taskId, editForm);
    setEditingTaskId(null);
  };

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
        {filters.map(filter => (
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
        ) : (
          visibleTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              editingTaskId={editingTaskId}
              editForm={editForm}
              setEditForm={setEditForm}
              startEdit={startEdit}
              saveEdit={saveEdit}
              setEditingTaskId={setEditingTaskId}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </section>
  );
}

function TaskCard({
  task,
  editingTaskId,
  editForm,
  setEditForm,
  startEdit,
  saveEdit,
  setEditingTaskId,
  updateTaskStatus,
  deleteTask,
}) {
  const isEditing = editingTaskId === task.id;
  return (
    <article className="rounded-lg h-66 overflow-y-auto  border-[#e5eaf2] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#246bfe]">
          {formatPriority(task.priority)}
        </p>
        <select
          className="rounded-lg border p-2"
          value={task.status}
          onChange={e => updateTaskStatus(task.id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mt-3 space-y-3">
        {isEditing ? (
          <>
            <input
              className="w-full rounded border p-2"
              value={editForm.title}
              placeholder="Task title"
              onChange={e =>
                setEditForm({
                  ...editForm,
                  title: e.target.value,
                })
              }
            />

            <textarea
              className="w-full rounded border p-2"
              rows={3}
              value={editForm.description}
              placeholder="Task description"
              onChange={e =>
                setEditForm({
                  ...editForm,
                  description: e.target.value,
                })
              }
            />

            {/* Assigned User */}
            <select
              className="w-full rounded border p-2"
              value={editForm.assignedTo}
              onChange={e =>
                setEditForm({
                  ...editForm,
                  assignedTo: e.target.value,
                })
              }
            >
              <option value="">Select User</option>

              <option value="John">John</option>
              <option value="Sarah">Sarah</option>
              <option value="Alex">Alex</option>
            </select>

            {/* Due Date */}
            <input
              type="date"
              className="w-full rounded border p-2"
              value={editForm.due}
              onChange={e =>
                setEditForm({
                  ...editForm,
                  due: e.target.value,
                })
              }
            />

            {/* Priority */}
            <select
              className="w-full rounded border p-2"
              value={editForm.priority}
              onChange={e =>
                setEditForm({
                  ...editForm,
                  priority: e.target.value,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </>
        ) : (
          <>
            <p className="text-sm leading-6 text-[#667085]">
              {task.description}
            </p>

            <div className="mt-3 space-y-2 text-sm text-[#475467]">
              <p>
                <strong>Assigned To:</strong>{" "}
                {task.assignedTo || "Not Assigned"}
              </p>

              <p>
                <strong>Due:</strong> {formatDueDate(task.due)}
              </p>

              <p>
                <strong>Status:</strong> {formatStatus(task.status)}
              </p>
            </div>
          </>
        )}
      </div>
      {/* Buttons */}
      <div className="mt-5 flex gap-2">
        {isEditing ? (
          <>
            <button
              className="rounded bg-green-600 hover:bg-green-700 cursor-pointer px-4 py-2 text-white"
              onClick={() => saveEdit(task.id)}
            >
              Save
            </button>

            <button
              className="rounded bg-gray-500 hover:bg-gray-600 cursor-pointer px-4 py-2 text-white"
              onClick={() => setEditingTaskId(null)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="rounded bg-blue-600 hover:bg-blue-700 cursor-pointer px-4 py-2 text-white"
              onClick={() => startEdit(task)}
            >
              Edit
            </button>
            <button
              className="rounded bg-red-600 hover:bg-red-700 cursor-pointer px-4 py-2 text-white"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </>
        )}
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
