import { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register Donor",

  description:
    "Create a BloodNeed account to donate blood, manage your profile, and help save lives.",

  keywords: [
    "register BloodNeed",
    "sign up blood donor",
    "create account",
    "blood donation registration",
    "donor portal",
    "join BloodNeed",
  ],

  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/auth/registeruser",
  },

  openGraph: {
    title: "Register – BloodNeed",
    description:
      "Sign up for BloodNeed to donate blood, track your donations, and support the community.",
    url: "https://blood-need-rajat.vercel.app/auth/registeruser",
    siteName: "BloodNeed",
    images: [
      {
        url: "/register.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Register",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Register – BloodNeed",
    description:
      "Join BloodNeed as a donor. Create your account now and start making a difference.",
    images: ["/register.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
