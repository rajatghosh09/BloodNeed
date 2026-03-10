"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import Image from "next/image"; // Brought Image back!
import { useAuthStore } from "@/zustand/userAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { role, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logout();

    if (response?.success) {
      toast.success(response.message);
      router.push("/");
    } else {
      toast.error(response?.message || "Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-800 dark:text-white font-medium">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-red-600 transition-colors">About</Link>
          <Link href="/campaign" className="hover:text-red-600 transition-colors">Campaign</Link>
          <Link href="/donors" className="hover:text-red-600 transition-colors">Donors</Link>
          <Link href="/blogs" className="hover:text-red-600 transition-colors">Blogs</Link>
          <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!role && (
            <>
              <Link
                href="/signin"
                className="px-5 py-2 rounded-full border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                href="/registeruser"
                className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md"
              >
                Donate
              </Link>
            </>
          )}

          {role === "user" && (
            <>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Sign Out
              </button>
              <Link
                href="/user"
                className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md"
              >
                Donor
              </Link>
            </>
          )}

          {role === "hospital" && (
            <>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Sign Out
              </button>
              <Link
                href="/hospital"
                className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md"
              >
                Hospital
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-red-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl border-t border-gray-100 dark:border-gray-800">
          <Link href="/" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/blood" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>
            Blood
          </Link>
          <Link href="/donors" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>
            Donors
          </Link>
          <Link href="/blogs" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>
            Blogs
          </Link>
          <Link href="/contact" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <div className="pt-4 flex flex-col gap-3 border-t border-gray-200 dark:border-gray-800">
            {!role && (
              <>
                <Link
                  href="/signin"
                  className="w-full text-center px-5 py-2.5 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/registeruser"
                  className="w-full text-center px-5 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Donate
                </Link>
              </>
            )}

            {role === "user" && (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full text-center px-5 py-2.5 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
                <Link
                  href="/user"
                  className="w-full text-center px-5 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Donor
                </Link>
              </>
            )}

            {role === "hospital" && (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full text-center px-5 py-2.5 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
                <Link
                  href="/hospital"
                  className="w-full text-center px-5 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Hospital
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;