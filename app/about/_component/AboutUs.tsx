"use client";

import Image from "next/image";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDF6E3] text-[#3A3A3A] relative overflow-hidden">
      {/* Subtle mystical glow / floating dust */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-linear-to-t from-[#FFECC0]/30 via-transparent to-transparent mix-blend-soft-light"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-8 py-24 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1
            className={`${playfair.className} text-5xl md:text-6xl text-[#C6A75E] tracking-wide`}
          >
            VedaVerse: The Mystical Archive
          </h1>
          <div className="w-24 h-0.5 bg-[#C6A75E] mx-auto" />
          <p
            className={`${cormorant.className} text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-[#3A3A3A]`}
          >
            Step into a luminous sanctuary of knowledge, where Nepalese literary
            heritage meets centuries of wisdom, illuminated with golden light
            and whispers of stories long preserved.
          </p>
        </section>

        {/* Cinematic Image Section */}
        <section className="relative h-120 rounded-xl overflow-hidden shadow-xl border border-[#FFECC0]">
          <Image
            src="/images/bg.jpg"
            alt="Mystical Library"
            fill
            className="object-cover brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#FFECC0]/40 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <h2 className={`${playfair.className} text-3xl text-[#C6A75E]`}>
              Where Knowledge Glows Like Sunlight
            </h2>
          </div>
        </section>

        {/* Our Purpose */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-4xl text-[#C6A75E]`}>
              Our Purpose
            </h2>
            <p className={`${cormorant.className} text-lg leading-relaxed`}>
              Inspired by Nepal’s ancient libraries and manuscript traditions,
              VedaVerse preserves knowledge while making it accessible to
              readers everywhere.
            </p>
            <p className={`${cormorant.className} text-lg leading-relaxed`}>
              A mystical light shines through the pages of every story we
              curate, connecting past wisdom to present minds.
            </p>
          </div>

          <div className="bg-[#FFF8E1] border border-[#FFECC0] p-10 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3
              className={`${playfair.className} text-2xl text-[#C6A75E] mb-6`}
            >
              Our Commitments
            </h3>
            <ul className={`${cormorant.className} space-y-4 text-lg`}>
              <li>• Preserve Nepal’s literary heritage.</li>
              <li>• Make knowledge accessible everywhere.</li>
              <li>• Encourage lifelong learning and curiosity.</li>
              <li>• Honor tradition while embracing technology.</li>
            </ul>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="text-center space-y-16">
          <h2 className={`${playfair.className} text-4xl text-[#C6A75E]`}>
            Pillars of the Mystical Archive
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Preservation",
                desc: "Safeguarding manuscripts and literature across Nepal.",
              },
              {
                title: "Accessibility",
                desc: "Bringing knowledge to every reader with magical ease.",
              },
              {
                title: "Continuity",
                desc: "Connecting generations with the glow of shared wisdom.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#FFF8E1] border border-[#FFECC0] p-10 rounded-xl shadow-md hover:shadow-xl transition duration-500"
              >
                <h3
                  className={`${playfair.className} text-2xl text-[#C6A75E] mb-4`}
                >
                  {item.title}
                </h3>
                <p className={`${cormorant.className} text-lg`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mystical Quote */}
        <section className="text-center pt-20 border-t border-[#FFECC0]">
          <blockquote
            className={`${playfair.className} text-2xl italic text-[#C6A75E]`}
          >
            “Every page is a sunbeam, illuminating the path of timeless
            knowledge.”
          </blockquote>
        </section>
      </div>
    </div>
  );
}
