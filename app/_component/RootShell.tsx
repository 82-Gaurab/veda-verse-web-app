"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen">
      {/* Render global sidebar ONLY if not admin */}
      {!isAdminRoute && <Sidebar />}

      <main className="flex-1 px-2 sm:px-6 lg:px-8 p-2">{children}</main>
    </div>
  );
}
