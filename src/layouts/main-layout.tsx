import Sidebar from "@/components/layout/sidebar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="relative pl-64 h-dvh bg-zinc-200 overflow-hidden">
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      <Outlet />
    </div>
  );
}

export default MainLayout;
