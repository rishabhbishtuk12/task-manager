import AppHeader from "../AppHeader";
import Sidebar from "../Sidebar";

function AppLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#1f2937]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          <div className="flex-1 overflow-auto px-4 py-5 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AppLayout;
