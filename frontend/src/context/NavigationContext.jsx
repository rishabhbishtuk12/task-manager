/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [activePage, setActivePage] = useState("dashboard");

  const value = useMemo(
    () => ({
      activePage,
      setActivePage,
    }),
    [activePage],
  );

  return (
    <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }

  return context;
}
