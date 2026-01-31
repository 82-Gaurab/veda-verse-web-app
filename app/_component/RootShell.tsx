"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import UserSidebar from "../(public)/user/_component/UserSidebar";
import AdminSidebar from "../admin/_components/Sidebar";

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");

  return (
    <div className="flex min-h-screen">
      {/* Render global sidebar ONLY if not admin */}
      {!isAdminRoute && !isUserRoute && <Sidebar />}
      {isUserRoute && <UserSidebar />}
      {isAdminRoute && <AdminSidebar />}

      <main className="flex-1 px-2 sm:px-6 lg:px-8 p-2">{children}</main>
    </div>
  );
}
