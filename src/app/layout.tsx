import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = ["/", "/login", "/register", "/forgot-password"].includes(
  location.pathname
);


  return (
    <div className="flex min-h-screen bg-[#E5ECFF]">
      {!isAuthPage && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      <div className="flex flex-1 flex-col">
        {!isAuthPage && (
          <Header onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        )}

        <main className={`${isAuthPage ? "h-svh" : "h-[calc(100vh-81px)] lg:px-8 px-3 py-6"} overflow-auto scroll-hide}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

