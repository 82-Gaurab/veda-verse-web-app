"use client";

import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex w-full min-h-screen">
        <div className="page-wrapper flex w-full">
          <div className="w-full bg-background">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-2">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
