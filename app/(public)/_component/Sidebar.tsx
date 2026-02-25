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
  const sidebarWidth = isCompact ? "90px" : "270px";
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname?.startsWith(href);

  return (
    <>
      <aside
        className="fixed top-0 left-0 h-screen z-40 flex flex-col justify-between transition-all duration-500 ease-in-out"
        style={{
          width: sidebarWidth,
          background: "#F2EFE8",
          paddingBottom: "32px",
          boxShadow:
            "8px 0 20px rgba(0,0,0,0.04), -4px 0 15px rgba(255,255,255,0.7)",
        }}
      >
        <div>
          {/* Header */}
          <div className="px-6 py-6 border-b border-neutral-200/40">
            <div
              className="flex items-center transition-all duration-300"
              style={{ gap: isCompact ? "0" : "14px" }}
            >
              <Link
                href="/admin"
                className="flex items-center gap-3"
                style={{
                  justifyContent: isCompact ? "center" : "",
                }}
              >
                {!isCompact && (
                  <>
                    <Image
                      src="/icons/logo.png"
                      height="42"
                      width="38"
                      alt="logo"
                      className="transition-all duration-300"
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
                height={isCompact ? 60 : 38}
                width={isCompact ? 40 : 34}
                alt="menu"
                className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-20 px-4 flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  justifyContent: isCompact ? "center" : "",
                }}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl
                  text-[13px] tracking-wider uppercase
                  transition-all duration-300 ease-in-out
                  ${
                    isActive(link.href)
                      ? `
                       bg-[#f1ede1] shadow-[inset_0_5px_8px_rgba(0,0,0,0.2)] rounded text-gray-700
                      `
                      : `
                        text-neutral-600
                        hover:bg-[#EAE6DE]
                        hover:shadow-[4px_4px_10px_rgba(0,0,0,0.04),-4px_-4px_10px_rgba(255,255,255,0.6)]
                        active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.06),inset_-3px_-3px_6px_rgba(255,255,255,0.6)]
                      `
                  }
                `}
              >
                <Image
                  src={`/icons/${link.id}.png`}
                  height={isCompact ? 28 : 22}
                  width={isCompact ? 28 : 22}
                  alt=""
                  className="transition-all duration-300 opacity-80"
                />
                {!isCompact && <span>{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Auth Card */}
        <div className="mx-5 mb-6">
          <div
            className="rounded-2xl p-3"
            style={{
              background: "#E6E2DA",
              boxShadow:
                "6px 6px 15px rgba(0,0,0,0.05), -6px -6px 15px rgba(255,255,255,0.7)",
            }}
          >
            <AuthModals isCompact={isCompact} />
          </div>
        </div>
      </aside>
    </>
  );
}
