import { logoutItem, navItems } from "../data/dashboardData";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";
import BrandBlock from "./brand/BrandBlock";
import { MenuIcon } from "./icons";

function Sidebar({ openSidebar, setOpenSidebar }) {
  const { logout } = useAuth();
  const { activePage, setActivePage } = useNavigation();

  return (
    <>
      {openSidebar && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpenSidebar(false)} // Close sidebar when clicking outside
        />
      )}

      <aside
        className={`
    fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto
    border-r border-slate-50 bg-white px-5 py-6
    transition-transform duration-300 ease-in-out
    ${openSidebar ? "translate-x-0" : "-translate-x-full"}
    lg:static lg:block lg:translate-x-0 shrink-0
  `}
      >
        <div className="flex justify-between">
          <BrandBlock />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce3ee] bg-white text-[#4b5563] lg:hidden"
            type="button"
            onClick={() => setOpenSidebar(false)}
          >
            <MenuIcon />
          </button>
        </div>

        <nav className="mt-9 space-y-2">
          {navItems.map(item => (
            <SidebarItem
              key={item.label}
              isActive={activePage === item.id}
              item={item}
              onClick={() => {
                setActivePage(item.id);
                setOpenSidebar(false); // Close sidebar on mobile after clicking item
              }}
            />
          ))}
        </nav>

        <div className="mt-8 border-t border-slate-50 pt-5">
          <SidebarItem item={logoutItem} onClick={logout} />
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ isActive = false, item, onClick }) {
  const Icon = item.icon;

  return (
    <button
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition cursor-pointer",
        isActive
          ? "bg-slate-50 text-blue-600"
          : ` ${item.label === "Logout" ? "text-red-700 hover:bg-red-700/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`,
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <Icon />
      <span>{item.label}</span>
    </button>
  );
}

export default Sidebar;
