import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with BloodNeed. Find answers to FAQs, learn how to donate blood, and contact our support team for assistance.",
  keywords: [
    "contact BloodNeed",
    "blood donation support",
    "donate blood",
    "help center",
    "FAQ",
    "blood donation inquiries",
    "customer service",
  ],
  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/contact",
  },
  openGraph: {
    title: "Contact – BloodNeed",
    description:
      "Get in touch with BloodNeed. Find answers to FAQs, learn how to donate blood, and contact our support team for assistance.",
    url: "https://blood-need-rajat.vercel.app/contact",
    siteName: "BloodNeed",
    images: [
      {
        url: "/contact.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Contact",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact – BloodNeed",
    description:
      "Get in touch with BloodNeed. Find answers to FAQs, learn how to donate blood, and contact our support team for assistance.",
    images: ["/contact.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
