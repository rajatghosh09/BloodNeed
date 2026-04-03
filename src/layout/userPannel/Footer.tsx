"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Youtube, Linkedin, Facebook, } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextHoverEffect } from "@/components/text-hover-effect";
import styled from 'styled-components';


export default function FooterSection({ className }: { className?: string }) {

  return (
    <footer
      className={cn(
        "relative w-full border-t border-white/10",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-rose-100 dark:from-black dark:via-neutral-900 dark:to-black -z-10" />
      <div className="absolute top-10 left-20 w-72 h-72 bg-rose-300/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-300/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo & Description */}
          <div className="space-y-4">
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

                {/* The Interactive Text */}
                <div className="flex flex-col relative">
                  <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-xl sm:text-2xl font-extrabold tracking-tight text-transparent transition-all duration-300 group-hover:from-red-700 group-hover:to-rose-600">
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
            <SocialWrapper>
              <ul className="social-list">
                {/* WhatsApp ✅ */}
                <li className="icon-content">
                  <a data-social="whatsapp" aria-label="Whatsapp" href="https://api.whatsapp.com/send?phone=+112067101079&text=Save%20this%20to%20your%20Favorites%20-%20@wilsondesouza">
                    <div className="filled" />
                    <svg xmlSpace="preserve" viewBox="0 0 24 24" className="bi bi-whatsapp" fill="currentColor" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <div className="tooltip">Whatsapp</div>
                </li>

                {/* YouTube */}
                <li className="icon-content">
                  <Link href="https://youtube.com" target="_blank">
                    <div className="filled" />
                    <Youtube size={22} />
                  </Link>
                  <div className="tooltip">YouTube</div>
                </li>

                {/* LinkedIn */}
                <li className="icon-content">
                  <Link href="https://linkedin.com" target="_blank">
                    <div className="filled" />
                    <Linkedin size={22} />
                  </Link>
                  <div className="tooltip">LinkedIn</div>
                </li>

                {/* Facebook */}
                <li className="icon-content">
                  <Link href="https://facebook.com" target="_blank">
                    <div className="filled" />
                    <Facebook size={22} />
                  </Link>
                  <div className="tooltip">Facebook</div>
                </li>
              </ul>
            </SocialWrapper>
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

        <div className="mt-16 border-t border-white/10 pt-6 text-center text-sm text-muted-foreground">
          © 2026 BloodNeed. All rights reserved.
        </div>

        {/* last hover effect on name */}
        <div className="w-full mt-10 xl:h-[16rem] lg:h-[12rem] md:h-[8rem] h-[6rem] flex items-center justify-center">
          <TextHoverEffect text="BLOODNEED" />
        </div>
      </div>
    </footer>
  );
}

const SocialWrapper = styled.div`
  .social-list {
    display: flex;
    gap: 14px;
    padding-top: 8px;
    flex-wrap: wrap;
  }

  .icon-content {
    position: relative;
  }

  .tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    color: #fff;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    white-space: nowrap;
  }

  .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    top: -45px;
  }

  .icon-content a {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #fff;
    color: #333;
    transition: 0.3s;
  }

  .icon-content a:hover {
    color: white;
    transform: scale(1.1);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  }

  .icon-content a svg {
    z-index: 1;
  }

  .filled {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    transition: 0.3s;
    z-index: 0;
  }

  .icon-content a:hover .filled {
    height: 100%;
  }

  /* Brand Colors */
/* WhatsApp */
.icon-content:nth-child(1) a .filled {
  background: #25d366;
}

/* YouTube */
.icon-content:nth-child(2) a .filled {
  background: #ff0000;
}

/* LinkedIn */
.icon-content:nth-child(3) a .filled {
  background: #0077b5;
}

/* Facebook */
.icon-content:nth-child(4) a .filled {
  background: #1877f2;
}

  @media (max-width: 640px) {
  .social-list {
    justify-content: center;
  }
}
`;