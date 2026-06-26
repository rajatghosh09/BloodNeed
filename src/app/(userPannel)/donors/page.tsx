import { Metadata } from "next";
import DonorsClient from "./DonorsClient";

export const metadata: Metadata = {
  title: "Donors",

  description:
    "Find nearby blood donors, search by location or blood type, and connect with donors to help save lives.",

  keywords: [
    "blood donors",
    "nearby donors",
    "donate blood",
    "blood donation",
    "donor search",
    "blood drive",
    "help save lives",
  ],

  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/donors",
  },

  openGraph: {
    title: "Donors – BloodNeed",
    description:
      "Locate nearby blood donors, filter by blood group and city, and get in touch to contribute to life‑saving donations.",
    url: "https://blood-need-rajat.vercel.app/donors",
    siteName: "BloodNeed",
    images: [
      {
        url: "/donors.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Donors",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Donors – BloodNeed",
    description:
      "Search and connect with nearby blood donors. Help save lives by facilitating donations.",
    images: ["/donors.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function DonorsPage() {
  return <DonorsClient />;
}
