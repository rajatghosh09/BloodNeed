"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/zustand/userAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import StarBorder from "@/components/react-bits/StarBorder";

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
        
        {/* LOGO SECTION */}
        <div className="flex items-center">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
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

            <div className="flex flex-col relative">
              <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-xl sm:text-2xl font-extrabold tracking-tight text-transparent transition-all duration-300 group-hover:from-red-700 group-hover:to-rose-600">
                BloodNeed
              </span>
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
          {/* Guest View */}
          {!role && (
            <>
              <Link href="/signin">
                <StarBorder color="#ef4444" speed="4s" className="text-red-600 font-semibold">
                  Sign In
                </StarBorder>
              </Link>

              <Link href="/registeruser">
                <StarBorder color="#ef4444" speed="3s" className="text-red-600 font-semibold">
                  Donate
                </StarBorder>
              </Link>
            </>
          )}

          {/* User View */}
          {role === "user" && (
            <>
              <StarBorder onClick={handleLogout} color="#ef4444" speed="4s" className="text-red-600 font-semibold">
                Sign Out
              </StarBorder>
              <Link href="/user">
                <StarBorder color="#ef4444" speed="3s" className="text-red-600 font-semibold">
                  Donor
                </StarBorder>
              </Link>
            </>
          )}

          {/* Hospital View */}
          {role === "hospital" && (
            <>
              <StarBorder onClick={handleLogout} color="#ef4444" speed="4s" className="text-red-600 font-semibold">
                Sign Out
              </StarBorder>
              <Link href="/hospital">
                <StarBorder color="#ef4444" speed="3s" className="text-red-600 font-semibold">
                  Hospital
                </StarBorder>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-red-600" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl border-t border-gray-100 dark:border-gray-800">
          <Link href="/" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>About</Link>
          <Link href="/donors" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>Donors</Link>
          <Link href="/blogs" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>Blogs</Link>
          <Link href="/contact" className="block hover:text-red-600 transition-colors" onClick={() => setOpen(false)}>Contact</Link>

          <div className="pt-4 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-800">
            {!role && (
              <>
                <Link href="/signin" onClick={() => setOpen(false)}>
                  <StarBorder color="#ef4444" className="w-full text-red-600 font-semibold">Sign In</StarBorder>
                </Link>
                <Link href="/registeruser" onClick={() => setOpen(false)}>
                  <StarBorder color="#ef4444" className="w-full text-red-600 font-semibold">Donate</StarBorder>
                </Link>
              </>
            )}

            {role === "user" && (
              <>
                <StarBorder color="#ef4444" className="w-full text-red-600 font-semibold" onClick={() => { handleLogout(); setOpen(false); }}>
                  Sign Out
                </StarBorder>
                <Link href="/user" onClick={() => setOpen(false)}>
                  <StarBorder color="#ef4444" className="w-full text-red-600 font-semibold">Donor</StarBorder>
                </Link>
              </>
            )}

            {role === "hospital" && (
              <>
                <StarBorder color="#ef4444" className="w-full text-red-600 font-semibold" onClick={() => { handleLogout(); setOpen(false); }}>
                  Sign Out
                </StarBorder>
                <Link href="/hospital" onClick={() => setOpen(false)}>
                  <StarBorder color="#ef4444" className="w-full text-red-600 font-semibold">Hospital</StarBorder>
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