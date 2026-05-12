import BrandMark from "./brand/BrandMark";
import { MenuIcon, PlusIcon } from "./icons";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";

const pageMeta = {
  dashboard: {
    eyebrow: "Welcome back",
    title: "Good Morning, Alex",
  },
  "manage-tasks": {
    eyebrow: "Task board",
  },
  "create-task": {
    eyebrow: "New assignment",
  },
  "team-members": {
    eyebrow: "People",
  },
};

function AppHeader({ setOpenSidebar }) {
  const { user } = useAuth();
  const { activePage } = useNavigation();
  const meta = pageMeta[activePage] || pageMeta.dashboard;

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5eaf2] bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce3ee] bg-white text-[#4b5563]"
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpenSidebar(open => !open)}
          >
            <MenuIcon />
          </button>
          <BrandMark />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-500">
            {meta.eyebrow}{" "}
            <span className="capitalize">
              {user?.role ? `- ${user.role}` : ""}
            </span>
          </p>
          <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            {activePage === "dashboard" && user?.name
              ? `Good Morning, ${user.name}`
              : meta.title}
          </h1>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
