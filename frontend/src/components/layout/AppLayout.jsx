import { useState } from "react";
import AppHeader from "../AppHeader";
import Sidebar from "../Sidebar";

function AppLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <main className="h-screen overflow-hidden bg-[#f5f7fb] text-[#1f2937]">
      <div className="flex h-full">
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <AppHeader
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AppLayout;
