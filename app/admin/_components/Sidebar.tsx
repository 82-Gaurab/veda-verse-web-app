"use client";

import { SidebarProps } from "@/app/(public)/_component/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", id: "dashboard" },
  { href: "/admin/users", label: "Users", id: "users" },
  { href: "/admin/books", label: "Books", id: "books" },
  { href: "/admin/orders", label: "Orders", id: "order" },
  { href: "/admin/genres", label: "Genres", id: "category" },
  { href: "/admin/messages", label: "Messages", id: "message" },
];

export default function AdminSidebar({
  isCompact,
  setIsCompact,
}: SidebarProps) {
  const pathname = usePathname();
  const sidebarWidth = isCompact ? "80px" : "256px";
  const { logout } = useAuth();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  return (
    <>
      <aside
        className="
          flex flex-col justify-between
          fixed top-0 left-0.5 h-screen
          border-r border-emerald-100
          z-40 overflow-hidden pb-8
          bg-emerald-50
          transition-all duration-300 ease-in-out
        "
        style={{ width: sidebarWidth }}
      >
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Logo Section */}
          <div className="p-4 border-b border-emerald-100">
            <div
              className="rounded flex items-center font-bold"
              style={{ gap: isCompact ? "0" : "16px" }}
            >
              <Link
                href="/admin"
                className="flex items-center gap-1"
                style={{
                  justifyContent: isCompact ? "center" : "",
                }}
              >
                {!isCompact && (
                  <>
                    <Image
                      src="/icons/logo.png"
                      height="40"
                      width="35"
                      alt="logo"
                      style={{
                        transition: "all ease-in-out 0.35s",
                        cursor: "pointer",
                      }}
                    />
                    <span className="font-semibold text-emerald-700 text-[20px]">
                      Admin Panel
                    </span>
                  </>
                )}
              </Link>

              <Image
                onClick={() => setIsCompact((prev) => !prev)}
                src="/icons/menu.png"
                height={isCompact ? 60 : 40}
                width={isCompact ? 40 : 35}
                alt="menu"
                className="transition-all ease-in-out duration-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-2 mt-2 space-y-1 flex flex-col gap-3">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  justifyContent: isCompact ? "center" : "",
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium 
                transition-all duration-200 ease-in-out
                ${
                  isActive(link.href)
                    ? "bg-emerald-100 text-emerald-800 shadow-inner"
                    : "text-emerald-700 hover:bg-emerald-100/70"
                }`}
              >
                <Image
                  src={`/icons/${link.id}.png`}
                  height={isCompact ? 30 : 25}
                  width={isCompact ? 30 : 25}
                  alt=""
                  style={{
                    transition: "all ease-in-out 0.6s",
                  }}
                />
                {!isCompact && <span>{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="relative z-10 px-3">
          <button
            onClick={logout}
            className="
              w-full
              flex items-center justify-center
              cursor-pointer
              gap-2 px-3 py-2 text-sm
              rounded-xl
              bg-emerald-100
              text-emerald-800
              hover:bg-emerald-200
              transition-all duration-200
            "
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
