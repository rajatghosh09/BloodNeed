import Footer from "@/layout/userPannel/Footer";
import Header from "@/layout/userPannel/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "BloodNeed | Blood Donation & Management Platform",
    template: "%s | BloodNeed",
  },
  description:
    "BloodNeed is a modern blood management platform that connects blood donors and hospitals. Register as a donor, hospitals can request blood, and users can book donation appointments easily.",

  keywords: [
    "blood donation",
    "blood bank management",
    "blood donor registration",
    "hospital blood request",
    "blood donation appointment",
    "blood management system",
    "online blood bank",
  ],

  authors: [{ name: "Rajat Ghosh", url: "https://my-portfolio-rg-eosin.vercel.app/" }],
  creator: "Rajat Ghosh",

  // Canonical URL "This helps search engines know the official URL of your site."
  alternates: {
    canonical: "https://blood-need-rajat.vercel.app",
  },

  robots: {
    index: true,
    follow: true,
  },

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


export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="pt-20">
                {children}
            </main>
            <Footer />
        </>
    );
}
