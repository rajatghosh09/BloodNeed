"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/zustand/userAuth";
import { Heart, ShieldCheck, Zap } from "lucide-react";

export default function FinalCTA() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);

  let redirectPath = "/signin";
  let buttonText = "Get Started";

  if (role === "user") {
    redirectPath = "/user";
    buttonText = "Go to Dashboard";
  }

  if (role === "hospital") {
    redirectPath = "/hospital";
    buttonText = "Go to Dashboard";
  }

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center py-28 px-4 overflow-hidden">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-black dark:via-neutral-900 dark:to-black" />

      {/* Floating Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-5xl w-full text-center backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-12"
      >
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          <span className="block text-gray-800 dark:text-white pb-4">
            Ready to make a
          </span>
            <span className="text-red-600">difference?</span>
        </h2>

        {/* Description */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Finding the right blood match shouldn’t be stressful.
          <span className="font-semibold text-gray-900 dark:text-white">
            {" "}BloodNeed{" "}
          </span>
          connects hospitals and donors instantly — when it matters most.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push(redirectPath)}
            className="group relative inline-flex items-center justify-center h-[60px] w-[240px] rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-red-300/50"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-20 transition duration-300 blur-xl" />
            <span className="relative z-10">{buttonText}</span>
          </button>
        </div>

        {/* Feature Icons */}
        <div className="mt-14 flex flex-wrap justify-center gap-10">

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 group-hover:scale-110 transition">
              <Heart color="red"/>
            </div>
            <span className="mt-3 font-semibold text-gray-700 dark:text-gray-300">
              Save Lives
            </span>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 group-hover:scale-110 transition">
              <Zap color="red"/>
            </div>
            <span className="mt-3 font-semibold text-gray-700 dark:text-gray-300">
              Fast Matching
            </span>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/300 group-hover:scale-110 transition">
              <ShieldCheck color="red" />
            </div>
            <span className="mt-3 font-semibold text-gray-700 dark:text-gray-300">
              Secure Platform
            </span>
          </div>

        </div>
      </motion.div>
    </section>
  );
}