import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import { TaskProvider } from "./context/TaskContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </NavigationProvider>
    </AuthProvider>
  );
}

export default App;
