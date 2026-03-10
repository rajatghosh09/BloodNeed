"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/zustand/userAuth";
import { LoaderCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion"; 
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const { loading, logout, user } = useAuthStore();

  const handleLogout = async () => {
    const res = await logout();

    // console.log("res", res);

    if (res?.success) {
      toast.success(res.message);
      router.push("/");
    } else {
      toast.error(res?.message || "Logout failed");
    }
  };

  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* Optional user name */}
          {user?.full_name && (
            <p className="text-sm text-muted-foreground hidden md:block">
              Hello, <span className="font-medium">{user.full_name}</span>
            </p>
          )}

          {/* Logout Button */}
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin h-4 w-4" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}

            {loading ? "Signing out..." : "Exit"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
