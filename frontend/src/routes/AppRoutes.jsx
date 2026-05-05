import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";
import AppLayout from "../components/layout/AppLayout";
import AuthPage from "../pages/AuthPage";
import CreateTaskPage from "../pages/CreateTaskPage";
import DashboardPage from "../pages/DashboardPage";
import ManageTasksPage from "../pages/ManageTasksPage";
import TeamMembersPage from "../pages/TeamMembersPage";

const routes = {
  dashboard: DashboardPage,
  "manage-tasks": ManageTasksPage,
  "create-task": CreateTaskPage,
  "team-members": TeamMembersPage,
};

function AppRoutes() {
  const { user } = useAuth();
  const { activePage } = useNavigation();
  const ActivePage = routes[activePage] || DashboardPage;

  if (!user) {
    return <AuthPage />;
  }

  return (
    <AppLayout>
      <ActivePage />
    </AppLayout>
  );
}

export default AppRoutes;
