import { Metadata } from "next";
import SigninClient from "./SigninClient";

export const metadata: Metadata = {
  title: "Sign In",

  description:
    "Sign in to your BloodNeed account to access your dashboard and manage your profile.",

  keywords: [
    "sign in BloodNeed",
    "login blood donation",
    "user dashboard",
    "blood donation portal",
    "account access",
  ],

  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/auth/signin",
  },

  openGraph: {
    title: "Sign In – BloodNeed",
    description:
      "Sign in to your BloodNeed account to access your dashboard and manage your profile.",
    url: "https://blood-need-rajat.vercel.app/auth/signin",
    siteName: "BloodNeed",
    images: [
      {
        url: "/signin.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Sign In",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sign In – BloodNeed",
    description:
      "Sign in to your BloodNeed account to access your dashboard and manage your profile.",
    images: ["/signin.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function SigninPage() {
  return <SigninClient />;
}
