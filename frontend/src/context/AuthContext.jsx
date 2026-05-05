/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { authApi } from "../utils/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "task-manager-user";

function getStoredUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const saveSession = session => {
    setUser(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  };

  const login = useCallback(async credentials => {
    setIsAuthLoading(true);
    setAuthError("");

    try {
      const session = await authApi.login(credentials);
      saveSession(session);
      return session;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const register = useCallback(async payload => {
    setIsAuthLoading(true);
    setAuthError("");

    try {
      const session = await authApi.register(payload);
      saveSession(session);
      return session;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      authError,
      isAuthLoading,
      login,
      logout,
      register,
      token: user?.token || "",
      user,
    }),
    [authError, isAuthLoading, login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
