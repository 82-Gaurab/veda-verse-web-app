"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SidebarProps } from "../../_component/Sidebar";

const LINKS = [
  { href: "/user/dashboard", label: "Home", id: "home" },
  { href: "/user/cart", label: "Cart", id: "cart" },
  { href: "/user/history", label: "Purchase History", id: "purchase-history" },
  { href: "/user/reviews", label: "Reviews", id: "review" },
];

export default function UserSidebar({ isCompact, setIsCompact }: SidebarProps) {
  const pathname = usePathname();
  const sidebarWidth = isCompact ? "80px" : "256px";

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname?.startsWith(href);

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
          <div className="px-6 py-6 border-b border-neutral-200/40 ">
            <div
              className="flex items-center transition-all duration-300"
              style={{ gap: isCompact ? "0" : "16px" }}
            >
              <Link
                href="/admin"
                className="flex items-center gap-3"
                style={{
                  justifyContent: isCompact ? "center" : "",
                }}
              >
                {isCompact ? null : (
                  <>
                    <Image
                      src="/icons/logo.png"
                      height="42"
                      width="38"
                      alt="logo"
                      style={{
                        transition: "all ease-in-out 0.35s",
                        cursor: "pointer",
                      }}
                    />
                    <span className="text-[#3F6E58] text-[20px] tracking-wide font-semibold">
                      VedaVerse
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
                className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
              />
            </div>
          </div>

          <nav className="mt-20 px-2.5 flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  justifyContent: isCompact ? "center" : "",
                }}
                className={` flex items-center gap-4 px-4 py-3 rounded-xl
                  text-[13px] tracking-wider uppercase
                  transition-all duration-300 ease-in-out ${
                    isActive(link.href)
                      ? "bg-[#f1ede1] shadow-[inset_0_5px_8px_rgba(0,0,0,0.2)] rounded text-gray-700"
                      : `
                        text-neutral-600
                        hover:bg-[#EAE6DE]
                        hover:shadow-[4px_4px_10px_rgba(0,0,0,0.04),-4px_-4px_10px_rgba(255,255,255,0.6)]
                        active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.06),inset_-3px_-3px_6px_rgba(255,255,255,0.6)]
                      `
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

        <Link
          href="/user/profile"
          className="m-3 flex justify-center items-center rounded-2xl p-3 transition active:scale-95"
          style={{
            background: "#E6E2DA",
            boxShadow:
              "6px 6px 15px rgba(0,0,0,0.05), -6px -6px 15px rgba(255,255,255,0.7)",
          }}
        >
          <Settings size={30} className="text-gray-700" />
        </Link>
      </aside>
    </>
  );
}
