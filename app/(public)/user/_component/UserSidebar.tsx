/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SidebarProps } from "../../_component/Sidebar";
import { useState } from "react";

const LINKS = [
  { href: "/user/dashboard", label: "Home", id: "home" },
  { href: "/user/wishlist", label: "WishList", id: "wishlist" },
  { href: "/user/cart", label: "Cart", id: "cart" },
  { href: "/user/history", label: "Purchase History", id: "purchase-history" },
  { href: "/user/reviews", label: "Reviews", id: "review" },
];

export default function UserSidebar({ isCompact, setIsCompact }: SidebarProps) {
  const pathname = usePathname();
  const sidebarWidth = isCompact ? "80px" : "256px";
  const [imgSrc, setImgSrc] = useState(
    // user?.profilePicture
    //   ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`      :
    "/icons/default-profile.png",
  );

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
                className="transition-all ease-in-out duration-300 cursor-pointer"
              />
            </div>
          </div>

          <nav className="p-2 mt-24 space-y-1 flex flex-col gap-3">
            {LINKS.map((link) => (
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

        <Link className="mb-6 flex justify-center" href={"/user/profile"}>
          <img
            src={imgSrc}
            alt="User Image"
            className={`${isCompact ? "w-12 h-12" : "w-10 h-10"} rounded-full object-cover`}
            onError={() => setImgSrc("/default-profile.png")}
          />
        </Link>
      </aside>
    </>
  );
}
