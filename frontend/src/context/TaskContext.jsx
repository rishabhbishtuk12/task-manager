/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  tasks as initialTasks,
  team as fallbackTeam,
} from "../data/dashboardData";
import { useAuth } from "./AuthContext";
import { taskApi, userApi } from "../utils/api";
import { normalizeTask } from "../utils/formatters";
import { buildTaskStats } from "../utils/taskUtils";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState(initialTasks.map(normalizeTask));
  const [team, setTeam] = useState(fallbackTeam);
  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  const loadData = useCallback(async () => {
    if (!token) {
      setTasks(initialTasks.map(normalizeTask));
      setTeam(fallbackTeam);
      return;
    }

    setIsLoading(true);
    setDataError("");

    try {
      const taskPayload = await taskApi.list(token);
      setTasks((taskPayload.tasks || []).map(normalizeTask));

      if (user?.role === "admin") {
        const users = await userApi.list(token);
        setTeam(users);
      }
    } catch (error) {
      setDataError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, user?.role]);

  const addTask = useCallback(
    task => {
      if (!token) {
        setTasks(currentTasks => [
          normalizeTask({
            _id: String(currentTasks.length + 1),
            status: "pending",
            todos: [],
            ...task,
          }),
          ...currentTasks,
        ]);
        return Promise.resolve();
      }

      return taskApi.create(token, task).then(payload => {
        setTasks(currentTasks => [
          normalizeTask(payload.task),
          ...currentTasks,
        ]);
        return payload.task;
      });
    },
    [token],
  );

  const updateTask = useCallback(
    async (taskId, updates) => {
      const payload = await taskApi.update(token, taskId, updates);

      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === taskId ? normalizeTask(payload.task) : task,
        ),
      );

      return payload.task;
    },
    [token],
  );

  const updateTaskStatus = useCallback(
    async (taskId, status) => {
      const payload = await taskApi.updateStatus(token, taskId, status);

      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === taskId ? normalizeTask(payload.task) : task,
        ),
      );

      return payload.task;
    },
    [token],
  );

  const deleteTask = useCallback(
    async taskId => {
      await taskApi.remove(token, taskId);

      setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
    },
    [token],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const value = useMemo(
    () => ({
      addTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
      dataError,
      isLoading,
      loadData,
      stats: buildTaskStats(tasks),
      tasks,
      team,
    }),
    [addTask, dataError, isLoading, loadData, tasks, team],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
