"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";
import {
  Heart,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
  Building2,
  CalendarCheck,
  Globe2,
  HandHeart,
  UserPlus,
  Sparkles,
  Droplet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FAQSection from "@/components/AboutFaq";

const chips = [
  { id: "mission", label: "Mission" },
  { id: "impact", label: "Impact" },
  { id: "how-it-works", label: "How it works" },
  { id: "values", label: "Values" },
  { id: "components", label: "Components" },
  { id: "faq", label: "FAQ" },
] as const;

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Specialist in Hematology with 12+ years of experience in blood bank management.",
  },
  {
    name: "Alex Rivera",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Passionate about building community-driven tech that solves real-world health crises.",
  },
  {
    name: "James Wilson",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Focuses on hospital partnerships and ensuring logistics run smoothly during emergencies.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

type SectionProps = PropsWithChildren<{ id: string; className?: string }>;

const Section = ({ id, className = "", children }: SectionProps) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>
    {children}
  </section>
);

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-100/50 via-white to-transparent pt-24 pb-12 relative flex flex-col items-center justify-center overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-slate-900 tracking-tight px-6 max-w-4xl"
        >
          &ldquo;Give blood, save lives.
          <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-rose-500 to-pink-500">
            Share hope, spread kindness.&rdquo;
          </span>
        </motion.h2>

        <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar py-8 px-6 max-w-7xl w-full mx-auto mt-8">
          {chips.map((chip) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              className="whitespace-nowrap rounded-full bg-white border border-rose-100 px-5 py-2 text-sm font-medium text-slate-600 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all shadow-sm"
            >
              {chip.label}
            </a>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Intro Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Heart className="w-4 h-4 fill-rose-500" />
            About Us
          </div>
          <h2 className="text-4xl font-bold text-slate-900">About Blood Need</h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Connecting generous donors with those in critical need.
          </p>
        </motion.div>

        {/* Split Grid (About Us Detail) */}
        <div className="grid lg:grid-cols-2 items-center bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-24">
          <div className="p-8 md:p-12 lg:p-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
              A smarter way to manage blood donation.
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              Blood Need is a community-driven platform dedicated to connecting blood donors with recipients in need. We believe that every donation has the potential to save lives.
            </p>
            <ul className="space-y-5">
              {["Real-time matching", "Secure communication", "Emergency alerts"].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start font-medium text-slate-700">
                  <div className="bg-rose-100 p-1.5 rounded-full mt-0.5">
                    <Heart className="text-rose-600 w-4 h-4 fill-rose-100" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 lg:h-full min-h-[500px] w-full bg-slate-100">
            <Image
              src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1741593907/DALL_E_2025-03-10_14.03.59_-_A_heartwarming_and_inspiring_image_of_a_blood_donation_process._A_donor_is_lying_on_a_hospital_bed_smiling_while_donating_blood_and_a_nurse_is_assis_jiepv7.webp"
              alt="Blood donation"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission Section */}
        <Section id="mission" className="mb-24">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Our Mission", icon: HeartPulse, desc: "Ensure no patient waits for blood. We unite donors and hospitals.", color: "rose" },
              { title: "Our Promise", icon: ShieldCheck, desc: "Safety first: verified donors, privacy, and audit trails.", color: "blue" },
              { title: "Who We Serve", icon: Stethoscope, desc: "Hospitals, NGOs, and everyday heroes who step up to donate.", color: "emerald" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-4 text-${item.color}-600`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-600">{item.desc}</CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Impact Section */}
        <Section id="impact" className="mb-24">
          <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden">
            <div className="bg-white p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-10">Our Impact</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Users, label: "Registered Donors", value: "12,500+" },
                  { icon: Building2, label: "Partner Hospitals", value: "85+" },
                  { icon: CalendarCheck, label: "Requests Fulfilled", value: "9,200+" },
                  { icon: Globe2, label: "Cities Covered", value: "40+" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                      <s.icon className="h-7 w-7 text-rose-500" />
                    </div>
                    <span className="text-4xl font-extrabold text-slate-900 mb-2">{s.value}</span>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Section>

        {/* How It Works Section */}
        <Section id="how-it-works" className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How Blood Need Works</h2>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", icon: HandHeart, title: "Request", desc: "Hospitals raise a verified request specifying urgency." },
              { step: "02", icon: UserPlus, title: "Match", desc: "Our engine locates compatible donors nearby instantly." },
              { step: "03", icon: Sparkles, title: "Fulfil", desc: "Secure handoff with status tracking and digital receipts." },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-xl transition-all h-full relative p-6 group">
                  <div className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-50 group-hover:text-rose-50 transition-colors pointer-events-none">{step.step}</div>
                  <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">{step.title}</CardTitle>
                  <CardContent className="p-0 text-slate-600 leading-relaxed">{step.desc}</CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Blood Components Section */}
        <Section id="components" className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Blood Components We Support</h2>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Whole Blood", "PRBC", "Plasma", "Platelets"].map((c) => (
              <motion.div key={c} variants={fadeUp}>
                <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-md transition-all p-8 flex flex-col items-center text-center">
                  <div className="p-3 bg-rose-50 rounded-full mb-4">
                    <Droplet className="h-6 w-6 text-rose-500 fill-rose-500/20" />
                  </div>
                  <span className="font-bold text-lg mb-2 text-slate-900">{c}</span>
                  <p className="text-xs text-slate-500">Precise matching and stock visibility for {c}.</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Team Section */}
        <Section id="team" className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Meet the Team</h2>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="rounded-3xl border-slate-100 shadow-sm overflow-hidden h-full group">
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <CardHeader className="text-center pt-6">
                    <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                    <p className="text-rose-600 font-semibold text-sm uppercase tracking-wide">{member.role}</p>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-8 text-slate-500 text-sm leading-relaxed">{member.bio}</CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* FAQ Section */}
        <Section id="faq">
          <FAQSection />
        </Section>
      </div>
    </div>
  );
};

export default About;