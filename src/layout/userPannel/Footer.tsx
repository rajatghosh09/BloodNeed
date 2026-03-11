"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextHoverEffect } from "@/components/text-hover-effect";


export default function FooterSection({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative w-full border-t border-white/10",
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-rose-100 dark:from-black dark:via-neutral-900 dark:to-black -z-10" />
      <div className="absolute top-10 left-20 w-72 h-72 bg-rose-300/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-300/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo & Description */}
          <div className="space-y-4">
            {/*LOGO SECTION */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3">

                {/* The Animated Image Container */}
                <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">

                  {/* Heartbeat Animation wrapping YOUR custom image */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* 👇 CHANGE YOUR LOGO IMAGE HERE 👇 */}
                    <Image
                      src="/donor-sync-icon-rounder.svg"
                      alt="Brand Logo"
                      width={38}
                      height={38}
                      className="rounded-lg shadow-sm"
                      priority
                    />
                  </motion.div>
                </div>

                {/* The Interactive Text */}
                <div className="flex flex-col relative">
                  <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-xl sm:text-2xl font-extrabold tracking-tight text-transparent transition-all duration-300 group-hover:from-red-700 group-hover:to-rose-600">
                    {/* 👇 CHANGE YOUR BRAND TEXT HERE 👇 */}
                    BloodNeed
                  </span>

                  {/* Animated Underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-red-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              BloodNeed is a smart blood donation platform connecting donors,
              hospitals, and recipients in real-time — making emergency response
              faster, safer, and more reliable.
            </p>
            {/* Social */}
            <div className="flex gap-4 pt-2">
              <Link
                href="https://github.com"
                target="_blank"
                className="p-2 rounded-lg bg-white/60 dark:bg-white/10 backdrop-blur hover:scale-110 transition"
              >
                <Github size={18} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="p-2 rounded-lg bg-white/60 dark:bg-white/10 backdrop-blur hover:scale-110 transition"
              >
                <Youtube size={18} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="p-2 rounded-lg bg-white/60 dark:bg-white/10 backdrop-blur hover:scale-110 transition"
              >
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition">Contact</Link></li>
              <li><Link href="/blogs" className="hover:text-foreground transition">Blogs</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/pricing" className="hover:text-foreground transition">Pricing</Link></li>
              <li><Link href="/partner" className="hover:text-foreground transition">Partner</Link></li>
              <li><Link href="/donate" className="hover:text-foreground transition">Donate</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-foreground transition">Cookies</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-6 text-center text-sm text-muted-foreground">
          © {year} BloodNeed. All rights reserved.
        </div>

        {/* last hover effect on name */}
        <div className="w-full mt-10 xl:h-[16rem] lg:h-[12rem] md:h-[8rem] h-[6rem] flex items-center justify-center">
          <TextHoverEffect text="BLOODNEED" />
        </div>
      </div>
    </footer>
  );
}