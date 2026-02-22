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
  { href: "/admin/categories", label: "Categories", id: "category" },
  { href: "/admin/messages", label: "Messages", id: "message" },
  { href: "/admin/inventory", label: "Inventory", id: "inventory" },
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
      {/* Sidebar */}
      <aside
        className={`
                flex flex-col justify-between fixed top-0 left-0.5 h-screen border-r border-gray-200 z-40 overflow-hidden pb-8 bg-[#F2EFE8] transition-all duration-400 ease-in-out`}
        style={{
          width: sidebarWidth,
        }}
      >
        <div>
          <div className="p-4 border-b border-gray-200 ">
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
                {isCompact ? null : (
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
                    <span className="font-semibold text-[#488563] text-[20px]">
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
                alt="logo"
                className="transition-all ease-in-out duration-300 cursor-pointer"
              />
            </div>
          </div>

          <nav className="p-2 mt-10 space-y-1 flex flex-col gap-3">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  justifyContent: isCompact ? "center" : "",
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out ${
                  isActive(link.href)
                    ? "bg-[#f1ede1] shadow-[inset_0_5px_8px_rgba(0,0,0,0.2)] rounded text-gray-700"
                    : "text-gray-700 hover:bg-fuchsia-200"
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
                {isCompact ? null : <span>{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={() => {
            logout();
          }}
          className="w-full mb-6 border flex items-center justify-center cursor-pointer text-black gap-2 px-3 py-2 text-sm rounded-md hover:bg-foreground/5 transition-colors"
        >
          Logout
        </button>
      </aside>
    </>
  );
}
