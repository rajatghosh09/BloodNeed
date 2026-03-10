import React from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowLeft,Calendar,Clock,User,Share2,Droplet,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// --- EXPANDED MOCK DATA ---
const blogDatabase = [
  {
    id: "1",
    title: "Why Donating Blood During the Summer is More Crucial Than Ever",
    category: "Health & Wellness",
    author: "Dr. Sarah Jenkins",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "Mar 5, 2026",
    readTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80", // Assuming you downloaded the image to public as discussed!
    content: `
      <p>Summer is a time for vacations, outdoor activities, and relaxation. However, for blood banks across the country, it is often a season of critical shortages. With schools closed and regular donors traveling, the supply drops significantly, but the demand never stops.</p>
      
      <h3>The Summer Drop-Off</h3>
      <p>Historically, blood donations drop by about 20% during the months of June, July, and August. High schools and colleges, which account for nearly 25% of all blood donations, are on break. This creates a massive gap in the inventory.</p>

      <blockquote>"Blood cannot be manufactured. It can only come from generous donors. When the summer hits, we rely heavily on our local community to step up and fill the void."</blockquote>

      <h3>Who Needs It?</h3>
      <p>Accidents, unfortunately, increase during the summer. More people are on the roads, participating in extreme sports, and working on construction projects. Furthermore, patients battling cancer, undergoing heart surgeries, and managing chronic diseases still require their regular transfusions.</p>
      
      <p>If you have 45 minutes to spare this week, please consider booking an appointment. One single donation can save up to three lives. Make it a summer tradition!</p>
    `,
  },
  {
    id: "2",
    title: "First-Time Donor? Here is Exactly What to Expect",
    category: "Donation Tips",
    author: "Rajat Ghosh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "Mar 2, 2026",
    readTime: "4 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    content: `
      <p>If you have never donated blood before, it is completely normal to feel a little anxious. Fear of needles or just the fear of the unknown keeps many potential lifesavers away. But the truth is, the process is incredibly safe, fast, and highly regulated.</p>

      <h3>Step 1: The Mini-Physical</h3>
      <p>Before you even sit in the donor chair, a medical professional will check your temperature, blood pressure, pulse, and hemoglobin levels. This ensures that you are perfectly healthy and that donating won't negatively affect you.</p>

      <h3>Step 2: The Donation</h3>
      <p>The actual donation only takes about 8 to 10 minutes. You will be seated in a comfortable chair. A phlebotomist will clean your arm and insert a sterile, brand-new needle. You might feel a quick pinch, but after that, it is generally painless.</p>

      <h3>Step 3: Snacks and Recovery</h3>
      <p>The best part! After donating, you are required to sit in the refreshment area for 10-15 minutes. You'll be given juice, water, and snacks to help your body replenish its fluids and blood sugar.</p>
      
      <p>Don't let fear stop you from being a hero today!</p>
    `,
  },
  {
    id: "3",
    title: "How Rahul's Single Donation Saved Three Lives",
    category: "Success Stories",
    author: "Admin Team",
    authorAvatar: "https://randomuser.me/api/portraits/men/78.jpg",
    date: "Feb 28, 2026",
    readTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    content: `
      <p>Rahul Das was just walking past the local hospital when he saw the blood drive sign. He had a rare O-negative blood type—the universal donor—but hadn't donated in over two years. On a whim, he decided to walk in.</p>
      
      <p>What Rahul didn't know was that just three floors above him, a complicated childbirth was taking place. The mother was experiencing severe hemorrhaging and urgently needed O-negative blood. The hospital's bank was completely out.</p>

      <p>Within hours of Rahul's donation being processed and tested, his blood was rushed to the maternity ward. Because whole blood can be separated into red cells, plasma, and platelets, his single donation didn't just stabilize the mother; it also provided crucial platelets for a leukemia patient in the oncology wing later that evening.</p>

      <p>We often talk about saving lives in the abstract, but for Rahul, the reality hit home a week later when the hospital arranged a brief, tearful meeting with the recovering mother. A simple 45-minute detour in his day changed multiple families forever.</p>
    `,
  },
  {
    id: "4",
    title: "Top 5 Iron-Rich Foods to Eat Before You Donate",
    category: "Health & Wellness",
    author: "Nutritionist Priya",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    date: "Feb 20, 2026",
    readTime: "3 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    content: `
      <p>Ensuring your iron levels are high is crucial before donating blood. Not only does it help you feel better post-donation, but it's required to pass the mini-physical screening!</p>
      
      <h3>1. Spinach and Dark Leafy Greens</h3>
      <p>Popeye had the right idea. Spinach, kale, and collard greens are packed with non-heme iron. Pair them with a squeeze of lemon (Vitamin C) to drastically increase absorption.</p>

      <h3>2. Lean Meats</h3>
      <p>Chicken, turkey, and lean cuts of beef are excellent sources of heme iron, which your body absorbs much easier than plant-based iron.</p>

      <h3>3. Beans and Lentils</h3>
      <p>A great option for our vegetarian donors! A single cup of lentils contains nearly 37% of your daily recommended iron intake.</p>
      
      <p>Make sure to eat a healthy, iron-rich meal about 2-3 hours before your appointment. Drink plenty of water, and you'll be good to go!</p>
    `,
  },
];

// 1. Notice the `async` keyword here, and the Promise type for params!
export default async function BlogPost({params}: {params: Promise<{ id: string }>}) {
  // 2. We MUST await the params in newer versions of Next.js
  const resolvedParams = await params;
  // 3. Find the matching post (using String() to guarantee types match safely)
  const post = blogDatabase.find(
    (p) => String(p.id) === String(resolvedParams.id),
  );

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800">Post Not Found</h1>
        <p className="text-gray-500 mt-2">
          The article you are looking for does not exist.
        </p>
        <Link href="/blogs">
          <Button className="mt-6 bg-red-600 hover:bg-red-700">
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white pb-24">
      {/* Hero Banner (Now with actual Image) */}
      <div className="w-full h-[50vh] min-h-[400px] relative">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        {/* Dark gradient overlay so the text/buttons are readable over any image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

        <div className="absolute top-8 left-8 z-10">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors bg-black/30 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/50"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-32 relative z-10">
        {/* Article Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1.5 w-fit">
              <Droplet className="w-3.5 h-3.5" fill="currentColor" />{" "}
              {post.category}
            </span>
            <button
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Share Article"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 font-medium text-gray-900">
              <Avatar className="w-10 h-10 border-2 border-gray-100 shadow-sm">
                <AvatarImage src={post.authorAvatar} alt={post.author} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="leading-tight">{post.author}</span>
                <span className="text-xs text-gray-400 font-normal">
                  Author
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" /> {post.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" /> {post.readTime}
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div
          className="mt-12 prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed
                     prose-headings:font-bold prose-headings:text-gray-900 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                     prose-p:mb-6 prose-a:text-red-600 hover:prose-a:text-red-700
                     prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:bg-red-50 prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:text-gray-900 prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom CTA */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
          <h4 className="text-xl font-bold text-gray-900 mb-3">
            Inspired to save a life?
          </h4>
          <p className="text-gray-600 mb-6">
            Join our community of donors and make a real difference today.
          </p>
          <Button
            
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full font-semibold shadow-md shadow-red-600/20"
          >
            <Link href="/signin">
            Register as a Donor
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
