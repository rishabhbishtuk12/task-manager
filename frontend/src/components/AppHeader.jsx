import BrandMark from "./brand/BrandMark";
import { FilterIcon, MenuIcon, PlusIcon } from "./icons";
import { navItems } from "../data/dashboardData";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";

const pageMeta = {
  dashboard: {
    eyebrow: "Welcome back",
    title: "Good Morning, Alex",
  },
  "manage-tasks": {
    eyebrow: "Task board",
    title: "Manage Tasks",
  },
  "create-task": {
    eyebrow: "New assignment",
    title: "Create Task",
  },
  "team-members": {
    eyebrow: "People",
    title: "Team Members",
  },
};

function AppHeader() {
  const { logout, user } = useAuth();
  const { activePage, setActivePage } = useNavigation();
  const meta = pageMeta[activePage] || pageMeta.dashboard;

  return (
    <header className="border-b border-[#e5eaf2] bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce3ee] bg-white text-[#4b5563]"
            type="button"
            aria-label="Open navigation"
          >
            <MenuIcon />
          </button>
          <BrandMark />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#667085]">
            {meta.eyebrow} {user?.role ? `- ${user.role}` : ""}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#111827] sm:text-3xl">
            {activePage === "dashboard" && user?.name
              ? `Good Morning, ${user.name}`
              : meta.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden h-10 items-center gap-2 rounded-lg border border-[#dce3ee] bg-white px-4 text-sm font-semibold text-[#344054] sm:inline-flex"
            type="button"
          >
            <FilterIcon />
            This Week
          </button>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#246bfe] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(36,107,254,0.8)]"
            type="button"
            onClick={() => setActivePage("create-task")}
          >
            <PlusIcon />
            New Task
          </button>
          <button
            className="h-10 rounded-lg border border-[#dce3ee] bg-white px-4 text-sm font-semibold text-[#344054]"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={[
              "shrink-0 rounded-lg px-3 py-2 text-sm font-bold",
              activePage === item.id
                ? "bg-[#246bfe] text-white"
                : "bg-[#f5f7fb] text-[#667085]",
            ].join(" ")}
            type="button"
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default AppHeader;
