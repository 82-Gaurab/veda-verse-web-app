"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-emerald-50 text-emerald-900 overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-24 space-y-32">
        {/* 🌿 Hero */}
        <section className="text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-600">
            Our Story
          </span>

          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            A Calm Sanctuary for Readers
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We believe books should feel like a warm space — peaceful,
            intentional, and timeless. Our collection brings together stories
            that inspire curiosity and quiet reflection.
          </p>
        </section>

        {/* 🌿 Cinematic Image */}
        <section className="relative rounded-3xl overflow-hidden">
          <div
            className="
              rounded-3xl overflow-hidden
              shadow-[10px_10px_30px_rgba(0,0,0,0.08),-10px_-10px_30px_rgba(255,255,255,0.9)]
            "
          >
            <Image
              src="/images/bg.jpg"
              alt="Library"
              width={1200}
              height={600}
              className="object-cover w-full h-112.5"
            />
          </div>

          <div className="absolute bottom-10 left-10 bg-white/70 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md">
            <h2 className="font-serif text-xl text-emerald-900">
              Where Stories Feel Like Home
            </h2>
          </div>
        </section>

        {/* 🌿 Purpose + Commitment */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          {/* Purpose */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold">Our Purpose</h2>

            <p className="text-gray-600 leading-relaxed">
              We curate meaningful books that nurture calm thinking, deep
              reflection, and lifelong learning.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Every title is selected with intention — blending tradition,
              knowledge, and modern accessibility.
            </p>
          </div>

          {/* Commitment Card */}
          <div
            className="
              p-10 rounded-3xl
              bg-emerald-50
              shadow-[8px_8px_24px_rgba(0,0,0,0.06),-8px_-8px_24px_rgba(255,255,255,0.9)]
            "
          >
            <h3 className="text-xl font-serif font-semibold mb-6">
              Our Commitments
            </h3>

            <ul className="space-y-4 text-gray-600 text-sm">
              <li>• Curate thoughtfully selected titles.</li>
              <li>• Create a peaceful digital browsing experience.</li>
              <li>• Encourage curiosity and reflection.</li>
              <li>• Blend tradition with modern simplicity.</li>
            </ul>
          </div>
        </section>

        {/* 🌿 Pillars */}
        <section className="space-y-16 text-center">
          <h2 className="text-3xl font-serif font-bold">Our Core Values</h2>

          <div className="flex flex-wrap justify-center gap-12">
            {[
              {
                title: "Thoughtful Curation",
                desc: "Books selected with care and intention.",
              },
              {
                title: "Accessibility",
                desc: "Knowledge made simple and approachable.",
              },
              {
                title: "Timelessness",
                desc: "Stories that resonate across generations.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  w-full md:w-[30%]
                  p-10 rounded-3xl
                  bg-emerald-50
                  shadow-[6px_6px_20px_rgba(0,0,0,0.06),-6px_-6px_20px_rgba(255,255,255,0.9)]
                  transition duration-300
                  hover:-translate-y-2
                "
              >
                <h3 className="font-serif text-xl mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 🌿 Quote */}
        <section className="text-center pt-20">
          <blockquote className="font-serif text-2xl italic text-emerald-700">
            “A good book feels like a quiet conversation that stays with you.”
          </blockquote>
        </section>
      </div>
    </div>
  );
}
