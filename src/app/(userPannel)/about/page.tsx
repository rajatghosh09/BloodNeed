import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",

  description:
    "Learn about BloodNeed, our mission to connect blood donors, hospitals, and patients through a modern blood donation and management platform.",

  keywords: [
    "about BloodNeed",
    "blood donation platform",
    "blood donor network",
    "blood bank management",
    "hospital blood requests",
    "blood donation system",
    "online blood donation",
    "blood donor community",
  ],

  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/about",
  },

  openGraph: {
    title: "About BloodNeed | Blood Donation Platform",
    description:
      "Discover BloodNeed's mission, vision, and impact in connecting blood donors with hospitals and patients in need.",
    url: "https://blood-need-rajat.vercel.app/about",
    siteName: "BloodNeed",
    images: [
      {
        url: "/donor.png",
        width: 1200,
        height: 630,
        alt: "About BloodNeed",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About BloodNeed",
    description:
      "Learn about BloodNeed and how we help connect blood donors with hospitals and patients.",
    images: ["/donor.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
