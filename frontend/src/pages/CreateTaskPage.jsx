import { useState } from "react";
import { useNavigation } from "../context/NavigationContext";
import { useTasks } from "../context/TaskContext";

const initialForm = {
  title: "",
  description: "",
  owner: "",
  priority: "",
  due: "",
};

function CreateTaskPage() {
  const { addTask, team } = useTasks();
  const { setActivePage } = useNavigation();
  const [form, setForm] = useState(initialForm);

  const updateField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const assignedUser = team.find(member => member.name === form.owner);

    await addTask({
      title: form.title || "Untitled task",
      description: form.description || "No description added yet.",
      priority: form.priority.toLowerCase(),
      dueDate: form.due || new Date().toISOString(),
      assignedTo: assignedUser?._id ? [assignedUser._id] : [],
      todos: [
        { text: "Define scope", completed: false },
        { text: "Start work", completed: false },
        { text: "Review outcome", completed: false },
      ],
      attachments: [],
    });
    setForm(initialForm);
    setActivePage("manage-tasks");
  };

  return (
    <section>
      <div>
        <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">
          Create Task
        </h1>
        <p className="mt-2 text-sm text-[#667085]">
          Add a new assignment with owner, priority, due date, and task details.
        </p>
      </div>

      <form
        className="mt-5 grid gap-5 rounded-lg border border-[#e5eaf2] bg-white p-5 lg:grid-cols-[1fr_320px]"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <Field label="Task Title">
            <input
              className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
              value={form.title}
              onChange={event => updateField("title", event.target.value)}
              placeholder="Enter task title"
            />
          </Field>

          <Field label="Description">
            <textarea
              className="min-h-32 w-full rounded-lg border border-[#dce3ee] px-3 py-3 text-sm outline-none focus:border-[#246bfe]"
              value={form.description}
              onChange={event => updateField("description", event.target.value)}
              placeholder="Write task details"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Assign To">
              <select
                className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
                value={form.owner}
                onChange={event => updateField("owner", event.target.value)}
              >
                <option key={"none"} value="">
                  Select user
                </option>
                {team.map(member => (
                  <option key={member._id || member.name}>{member.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Priority">
              <select
                className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
                value={form.priority}
                onChange={event => updateField("priority", event.target.value)}
              >
                <option>None</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </Field>
          </div>

          <Field label="Due Date">
            <input
              className="h-11 w-full rounded-lg border border-[#dce3ee] px-3 text-sm outline-none focus:border-[#246bfe]"
              type="date"
              value={form.due}
              onChange={event => updateField("due", event.target.value)}
            />
          </Field>
        </div>

        <aside className="rounded-lg bg-[#f8fafc] p-5">
          <h2 className="text-lg font-bold text-[#111827]">Task Preview</h2>
          <div className="mt-5 rounded-lg bg-white p-4">
            <p className="text-sm font-bold text-[#246bfe]">{form.priority}</p>
            <h3 className="mt-2 font-bold text-[#111827]">
              {form.title || "Task title"}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#667085]">
              {form.description || "Task description will appear here."}
            </p>
            <div className="mt-4 flex justify-between text-sm">
              <span className="font-semibold text-[#344054]">{form.owner}</span>
              <span className="text-[#667085]">{form.due || "Due date"}</span>
            </div>
          </div>
          <button
            className="mt-5 h-11 w-full rounded-lg bg-[#246bfe] text-sm font-bold text-white disabled:cursor-not-allowed cursor-pointer disabled:bg-slate-500"
            type="submit"
            disabled={
              !form.title ||
              !form.owner ||
              !form.priority ||
              !form.due ||
              form.priority === "None"
            }
          >
            Create Task
          </button>
        </aside>
      </form>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#344054]">
        {label}
      </span>
      {children}
    </label>
  );
}

export default CreateTaskPage;
