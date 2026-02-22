"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthModals from "../../(auth)/_components/auth-handler";

const LINKS = [
  { href: "/", label: "Home", id: "home" },
  { href: "/about", label: "About", id: "about" },
  { href: "/explore", label: "Explore", id: "explore" },
  { href: "/contact", label: "Contact Us", id: "contact" },
];
export interface SidebarProps {
  isCompact: boolean;
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isCompact, setIsCompact }: SidebarProps) {
  const sidebarWidth = isCompact ? "80px" : "256px";
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname?.startsWith(href);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
                flex flex-col justify-between fixed top-0 left-0.5 h-screen border-r border-gray-200 z-40 overflow-hidden`}
        style={{
          paddingBottom: "32px",
          backgroundColor: "#F2EFE8",
          width: sidebarWidth,
          transition: "all ease-in-out 0.4s",
        }}
      >
        <div>
          <div className="p-4 border-b border-gray-200 ">
            <div className="rounded flex items-center justify-center font-bold"></div>
            <Link
              href="/"
              className="flex items-center gap-2"
              style={{ justifyContent: isCompact ? "center" : "" }}
            >
              {isCompact ? null : (
                <>
                  <Image
                    src="/icons/logo.png"
                    height={isCompact ? 60 : 40}
                    width={isCompact ? 40 : 50}
                    alt="logo"
                    style={{
                      transition: "all ease-in-out 0.35s",
                      cursor: "pointer",
                    }}
                  />
                  <span className="font-semibold text-[#488563] text-[25px]">
                    VedaVerse
                  </span>
                </>
              )}
              <Image
                onClick={() => setIsCompact((prev) => !prev)}
                src="/icons/menu.png"
                height={isCompact ? 60 : 40}
                width={isCompact ? 40 : 50}
                alt="logo"
                className="transition-all ease-in-out duration-300 cursor-pointer"
              />
            </Link>
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

        <div className="m-6">
          <AuthModals isCompact={isCompact} />
        </div>
      </aside>
    </>
  );
}
