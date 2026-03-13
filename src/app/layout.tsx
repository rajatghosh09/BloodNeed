import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner"
import TanstackQueryProvide from "@/services/helper/provider/TanstackQuery";
import { Suspense } from "react";
import LoadingDrop from "@/components/LoadingDrop";


export const metadata: Metadata = {
  title: {
    default: "BloodNeed | Blood Donation & Management Platform",
    template: "%s | BloodNeed",
  },
  description:
    "BloodNeed is a modern blood management platform that connects blood donors, hospitals, and patients. Register as a donor, hospitals can request blood, and users can book donation appointments easily.",

  keywords: [
    "blood donation",
    "blood bank management",
    "blood donor registration",
    "hospital blood request",
    "blood donation appointment",
    "blood management system",
    "online blood bank",
  ],

  authors: [{ name: "Rajat Ghosh" }],
  creator: "Rajat Ghosh",

  openGraph: {
    title: "BloodNeed | Blood Donation & Management Platform",
    description:
      "Join BloodNeed to donate blood, register hospitals, request blood units, and book donation appointments online.",
    url: "https://blood-need-rajat.vercel.app",
    siteName: "BloodNeed",
    images: [
      {
        url: "/donor.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Blood Donation Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BloodNeed | Blood Donation Platform",
    description:
      "Register as a donor, hospitals can request blood, and users can book donation appointments easily.",
    images: ["/donor.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  metadataBase: new URL("https://blood-need-rajat.vercel.app"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<LoadingDrop />}>
          <Toaster position="top-center" richColors />
          <TanstackQueryProvide>
            {children}
          </TanstackQueryProvide>
        </Suspense>
      </body>
    </html>
  );
}
