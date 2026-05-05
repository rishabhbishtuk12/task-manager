import { logoutItem, navItems } from "../data/dashboardData";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";
import BrandBlock from "./brand/BrandBlock";

function Sidebar() {
  const { logout } = useAuth();
  const { activePage, setActivePage } = useNavigation();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[#e5eaf2] bg-white px-5 py-6 lg:block">
      <BrandBlock />
      <nav className="mt-9 space-y-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.label}
            isActive={activePage === item.id}
            item={item}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </nav>
      <div className="mt-10 border-t border-[#e5eaf2] pt-5">
        <SidebarItem item={logoutItem} onClick={logout} />
      </div>
    </aside>
  );
}

function SidebarItem({ isActive = false, item, onClick }) {
  const Icon = item.icon;

  return (
    <button
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition",
        isActive
          ? "bg-[#eef4ff] text-[#246bfe]"
          : "text-[#667085] hover:bg-[#f5f7fb] hover:text-[#111827]",
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
