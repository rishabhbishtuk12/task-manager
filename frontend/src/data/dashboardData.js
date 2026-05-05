import {
  DashboardIcon,
  LogoutIcon,
  PlusIcon,
  TasksIcon,
  TeamIcon,
} from "../components/icons";

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "manage-tasks", label: "Manage Tasks", icon: TasksIcon },
  { id: "create-task", label: "Create Task", icon: PlusIcon },
  { id: "team-members", label: "Team Members", icon: TeamIcon },
];

export const logoutItem = { label: "Logout", icon: LogoutIcon };

export const stats = [
  { label: "Total Tasks", value: "28", change: "+4 this week", tone: "blue" },
  { label: "Pending", value: "12", change: "3 high priority", tone: "amber" },
  { label: "In Progress", value: "9", change: "6 assigned today", tone: "violet" },
  { label: "Completed", value: "7", change: "25% completion", tone: "green" },
];

export const tasks = [
  {
    id: 1,
    title: "Design onboarding screens",
    owner: "Ananya",
    status: "In Progress",
    priority: "High",
    due: "Today",
    description: "Create polished first-run screens for new users.",
    checklist: ["Wireframe states", "Mobile pass", "Review copy"],
  },
  {
    id: 2,
    title: "Fix auth redirect issue",
    owner: "Rohit",
    status: "Pending",
    priority: "Medium",
    due: "Tomorrow",
    description: "Users should return to their intended page after login.",
    checklist: ["Reproduce bug", "Patch route guard", "Regression test"],
  },
  {
    id: 3,
    title: "Prepare sprint review notes",
    owner: "Kavya",
    status: "Completed",
    priority: "Low",
    due: "May 8",
    description: "Summarize progress, risks, and carry-over items.",
    checklist: ["Collect metrics", "Draft notes", "Share agenda"],
  },
  {
    id: 4,
    title: "QA task filters",
    owner: "Ishaan",
    status: "In Progress",
    priority: "Medium",
    due: "May 9",
    description: "Verify status, priority, and owner filters on task lists.",
    checklist: ["Filter matrix", "Edge states", "Bug report"],
  },
];

export const recentTasks = tasks;

export const team = [
  { name: "Ananya", role: "Product Designer", initials: "AN", tasks: 8 },
  { name: "Rohit", role: "Frontend Engineer", initials: "RO", tasks: 6 },
  { name: "Kavya", role: "Project Lead", initials: "KA", tasks: 5 },
];

export const weeklyActivity = [42, 58, 38, 70, 52, 84, 64];
