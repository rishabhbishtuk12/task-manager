import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Users,
} from "lucide-react";
export function DashboardIcon() {
  return <LayoutDashboard className="size-5" />;
}

export function TasksIcon() {
  return <ClipboardList className="size-5" />;
}

export function PlusIcon() {
  return <Plus className="size-5" />;
}

export function TeamIcon() {
  return <Users className="size-5" />;
}

export function LogoutIcon() {
  return <LogOut className="size-5" />;
}

export function MenuIcon() {
  return <Menu className="size-5 cursor-pointer" />;
}
