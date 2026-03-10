"use client";

import Image from "next/image";
import { MapPin, Clock, ArrowRight, HeartPulse } from "lucide-react";

// --- MOCK DATA ---
const campaigns = [
  {
    id: 1,
    date: "14 JUNE, 2026",
    title: "World Blood Donors Day",
    description: "Celebrate World Blood Donor Day. The event serves to thank voluntary, unpaid blood donors for their life-saving gifts.",
    time: "10:00 AM - 3:00 PM",
    location: "Central City Hospital, California",
    image: "/campaign/c1.jpg",
  },
  {
    id: 2,
    date: "20 SEP, 2026",
    title: "Universal Donors Needed",
    description: "O Negative blood cells are called “universal”. We urgently require O- donors to restock our emergency supplies.",
    time: "09:00 AM - 4:00 PM",
    location: "Community Center, NY",
    image: "/campaign/c2.jpg",
  },
  {
    id: 3,
    date: "25 OCT, 2026",
    title: "You Are Somebody’s Type",
    description: "Bring smiles to their faces, and encourage your friends and family to donate blood in this mega drive.",
    time: "11:00 AM - 5:00 PM",
    location: "City Mall Atrium, Texas",
    image: "/campaign/c3.jpg",
  },
  {
    id: 4,
    date: "12 NOV, 2026",
    title: "Give Blood, Give Life",
    description: "You're a real hero because you can gift a new life. Donate your blood and enjoy the peace of saving a life.",
    time: "10:00 AM - 2:00 PM",
    location: "University Campus, Ohio",
    image: "/campaign/c4.jpg",
  },
];

const gallery = [
  "/campaign/c1.jpg",
  "/campaign/c2.jpg",
  "/campaign/c3.jpg",
  "/campaign/c4.jpg",
  "/campaign/c5.jpg",
];

export default function CampaignsPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900">
      
      {/* 1. CLEAN HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-100">
              <HeartPulse className="w-4 h-4" /> Act Now, Save Lives
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
              Be the reason <br/>
              <span className="text-red-600 relative">
                someone smiles
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
                </svg>
              </span> today.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your single donation can save up to three lives. Discover upcoming blood drives in your area and join our community of everyday heroes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 shadow-lg shadow-gray-200">
                Register to Donate <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Images Collage */}
          <div className="relative h-[400px] md:h-[500px] hidden md:block">
            <div className="absolute top-0 right-0 w-3/4 h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10">
              <Image src="/campaign/c1.jpg" alt="Blood Donation" fill className="object-cover" priority />
            </div>
            <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-xl border-4 border-white z-20">
              <Image src="/campaign/c2.jpg" alt="Happy Donor" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ELEGANT EVENT LIST SECTION */}
      <section className="bg-slate-50 py-20 md:py-32 border-y border-slate-100">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Upcoming Drives</h2>
              <p className="text-gray-500 mt-2">Find a convenient time and location to give blood.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {campaigns.map((c) => (
              <div key={c.id} className="group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6">
                
                {/* Date Block */}
                <div className="flex flex-col items-center justify-center min-w-[100px] p-4 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
                  <span className="text-sm font-bold text-red-600 uppercase tracking-widest">{c.date.split(" ")[1].replace(",", "")}</span>
                  <span className="text-3xl font-black text-gray-900 leading-none mt-1">{c.date.split(" ")[0]}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{c.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 md:line-clamp-1">{c.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> {c.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> {c.location}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <button className="w-full md:w-auto px-6 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-red-600 hover:text-red-600 transition-all">
                    View Details
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MODERN MASONRY GALLERY */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Moments of Impact</h2>
            <p className="text-gray-500 mt-4">A glimpse into our past campaigns and the incredible people who make them possible.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {/* Large Featured Image */}
            <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
              <Image src={gallery[0]} alt="Gallery 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            
            {/* Smaller Images */}
            <div className="relative rounded-3xl overflow-hidden group">
              <Image src={gallery[1]} alt="Gallery 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative rounded-3xl overflow-hidden group">
              <Image src={gallery[2]} alt="Gallery 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="col-span-2 relative rounded-3xl overflow-hidden group">
              <Image src={gallery[3]} alt="Gallery 4" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. SOFT CTA FOOTER */}
      <section className="bg-red-50 border-t border-red-100 py-24">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <HeartPulse className="w-12 h-12 text-red-500 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Ready to make a difference?</h2>
          <p className="text-lg text-gray-600 mb-10">Sign up today to receive notifications about urgent blood needs and upcoming campaigns in your local area.</p>
          <button className="px-10 py-5 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-colors duration-300 shadow-xl shadow-red-600/20">
            Become a Donor Today
          </button>
        </div>
      </section>

    </main>
  );
}