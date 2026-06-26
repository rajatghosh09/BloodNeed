import { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Blogs",

  description:
    "Explore the latest articles, updates, and stories from BloodNeed covering blood donation, donor experiences, and industry insights.",

  keywords: [
    "blogs BloodNeed",
    "blood donation articles",
    "donor stories",
    "blood bank news",
    "healthcare updates",
    "blood donation tips",
    "community stories",
  ],

  alternates: {
    canonical: "https://blood-need-rajat.vercel.app/blogs",
  },

  openGraph: {
    title: "BloodNeed Blogs",
    description:
      "Read insightful articles and updates about blood donation, donor experiences, and health initiatives.",
    url: "https://blood-need-rajat.vercel.app/blogs",
    siteName: "BloodNeed",
    images: [
      {
        url: "/blog.png",
        width: 1200,
        height: 630,
        alt: "BloodNeed Blog",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BloodNeed Blogs",
    description:
      "Latest posts on blood donation, donor stories, and health news.",
    images: ["/blog.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
