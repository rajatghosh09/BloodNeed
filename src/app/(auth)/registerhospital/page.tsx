import { Metadata } from "next";
import RegisterHospital from "./RegisterHospital";

export const metadata: Metadata = {
  title: "Register Hospital",

  description:
    "Create a BloodNeed hospital account to manage donations, view requests, and help save lives.",

  keywords: [
    "register hospital",
    "hospital signup",
    "blood bank registration",
    "donate blood",
    "join BloodNeed",
    "hospital portal",
  ],

  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/auth/registerhospital",
  },

  openGraph: {
    title: "Register Hospital – BloodNeed",
    description:
      "Create a BloodNeed hospital account to manage donations, view requests, and help save lives.",
    url: "https://blood-need-rajat.vercel.app/auth/registerhospital",
    siteName: "BloodNeed",
    images: [
      {
        url: "/registerhospital.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Register Hospital",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Register Hospital – BloodNeed",
    description:
      "Sign up your hospital on BloodNeed to manage blood donations and help the community.",
    images: ["/registerhospital.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};



export default function RegisterHospitalPage() {
  return <RegisterHospital />;
}
