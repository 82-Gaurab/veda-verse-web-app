"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import UserSidebar from "../user/_component/UserSidebar";
import AdminSidebar from "../../admin/_components/Sidebar";
import { SetStateAction, useState } from "react";

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");
  const sidebarWidth = isCompact ? "80px" : "256px";

  return (
    <div className="flex">
      {/* Render global sidebar ONLY if not admin */}
      {!isAdminRoute && !isUserRoute && (
        <Sidebar isCompact={isCompact} setIsCompact={setIsCompact} />
      )}
      {isUserRoute && <UserSidebar />}
      {isAdminRoute && <AdminSidebar />}

      <main
        className="transition-all duration-300 min-h-screen"
        style={{
          marginLeft: `${parseInt(sidebarWidth) + 10}px`,
          marginRight: "10px",
          marginTop: "1px",
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        {children}
      </main>
    </div>
  );
}
