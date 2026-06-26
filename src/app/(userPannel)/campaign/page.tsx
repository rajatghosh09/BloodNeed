import { Metadata } from "next";
import CampaignsClient from "./CampaignClient";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Explore upcoming blood donation campaigns, events, and drives organized by BloodNeed to inspire donors and support communities.",
  keywords: [
    "blood donation campaigns",
    "blood drives",
    "donor events",
    "campaign schedule",
    "BloodNeed campaigns",
    "community blood donation",
    "health initiatives",
  ],
  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/campaign",
  },
  openGraph: {
    title: "BloodNeed Campaigns",
    description: "Discover upcoming blood donation campaigns, events, and ways to get involved with BloodNeed.",
    url: "https://blood-need-rajat.vercel.app/campaign",
    siteName: "BloodNeed",
    images: [
      {
        url: "/campaign/cover.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Campaign",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BloodNeed Campaigns",
    description: "Join upcoming blood donation campaigns and make an impact.",
    images: ["/campaign/cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CampaignsPage() {
  return <CampaignsClient />;
}
