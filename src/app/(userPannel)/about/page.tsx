"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";
import {Heart,HeartPulse,ShieldCheck,Stethoscope,Users,Building2,CalendarCheck,Globe2,HandHeart,UserPlus,Sparkles,Droplet,Linkedin,Twitter,Mail,Github,} from "lucide-react";
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
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Specialist in Hematology with 12+ years of experience in blood bank management.",
    social: { linkedin: "#", twitter: "#", mail: "#" },
  },
  {
    name: "Alex Rivera",
    role: "Head of Product",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Passionate about building community-driven tech that solves real-world health crises.",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "James Wilson",
    role: "Operations Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Focuses on hospital partnerships and ensuring logistics run smoothly during emergencies.",
    social: { linkedin: "#", mail: "#" },
  },
];
/* ---------------- Animation Variants ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

/* ---------------- Section Component ---------------- */

type SectionProps = PropsWithChildren<{ id: string; className?: string }>;

const Section = ({ id, className = "", children }: SectionProps) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>
    {children}
  </section>
);

/* ---------------- Main Component ---------------- */

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

        {/* Chips */}
        <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar py-8 px-6 max-w-7xl w-full mx-auto mt-8 mask-fade-edges">
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

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Heart className="w-4 h-4 fill-rose-500" />
            About Us
          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            About Blood Need
          </h2>

          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Connecting generous donors with those in critical need, making the
            gift of life accessible to everyone.
          </p>
        </motion.div>

        {/* Split Grid */}
        <div className="grid lg:grid-cols-2 items-center bg-white rounded-3xl shadow-xl shadow-rose-900/5 border border-slate-100 overflow-hidden mb-24">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 md:p-12 lg:p-16"
          >
            <motion.h3
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6"
            >
              A smarter way to manage blood donation.
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 mb-8 leading-relaxed text-lg"
            >
              Blood Need is a community-driven platform dedicated to connecting
              blood donors with recipients in need. We believe that every
              donation has the potential to save lives, and our mission is to
              make the process as simple and efficient as possible.
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              className="space-y-5 text-slate-700"
            >
              {[
                "Real-time matching of donors with recipients",
                "Secure & private communication channels",
                "Emergency alerts for urgent local requirements",
                "Educational resources about health & eligibility",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeUp}
                  className="flex gap-4 items-start"
                >
                  <div className="bg-rose-100 p-1.5 rounded-full mt-0.5">
                    <Heart className="text-rose-600 w-4 h-4 fill-rose-100" />
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Image */}
          <div className="relative h-80 lg:h-full min-h-[500px] w-full bg-slate-100">
            <Image
              src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1741593907/DALL_E_2025-03-10_14.03.59_-_A_heartwarming_and_inspiring_image_of_a_blood_donation_process._A_donor_is_lying_on_a_hospital_bed_smiling_while_donating_blood_and_a_nurse_is_assis_jiepv7.webp"
              alt="Blood donation process"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent lg:from-white/40"></div>
          </div>
        </div>

        {/* Mission Cards Section */}
        <Section id="mission">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* Mission */}
            <motion.div variants={fadeUp}>
              <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-4 text-rose-600">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Ensure no patient waits for blood. We unite donors, hospitals,
                  and communities with transparent real-time tools.
                </CardContent>
              </Card>
            </motion.div>

            {/* Promise */}
            <motion.div variants={fadeUp}>
              <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    Our Promise
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Safety first: verified donors, privacy-aware workflows, audit
                  trails, and strictly enforced role-based access.
                </CardContent>
              </Card>
            </motion.div>

            {/* Serve */}
            <motion.div variants={fadeUp}>
              <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    Who We Serve
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed">
                  Hospitals, blood banks, NGOs, and everyday heroes who step up
                  to donate and save lives in their communities.
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Section>

        {/* Impact Section */}
        <Section id="impact" className="mt-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-rose-900/5 p-8 md:p-12"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Our Impact</h2>
              <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
                Numbers that tell a story of hope, community, and lives saved
                across the region.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {[
                { icon: Users, label: "Registered Donors", value: "12,500+" },
                { icon: Building2, label: "Partner Hospitals", value: "85+" },
                {
                  icon: CalendarCheck,
                  label: "Requests Fulfilled",
                  value: "9,200+",
                },
                { icon: Globe2, label: "Cities Covered", value: "40+" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0"
                >
                  <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <s.icon className="h-7 w-7 text-rose-500" />
                  </div>
                  <span className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-sm md:text-base font-medium text-slate-500 uppercase tracking-wide">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* How It Works Section */}
        <Section id="how-it-works" className="mt-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              How Blood Need Works
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Three simple steps to bridge the gap between need and help.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3 relative"
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-rose-200 to-transparent -translate-y-1/2 z-0" />

            {[
              {
                icon: HandHeart,
                step: "01",
                title: "Request",
                desc: "Hospitals or NGOs raise a verified request specifying urgency and exact blood component details.",
              },
              {
                icon: UserPlus,
                step: "02",
                title: "Match",
                desc: "Our smart engine instantly locates compatible, eligible donors nearby and sends them real-time alerts.",
              },
              {
                icon: Sparkles,
                step: "03",
                title: "Fulfil",
                desc: "Secure handoff with status tracking, final confirmations, and digital receipts for total transparency.",
              },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative z-10">
                <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white h-full relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 text-9xl font-black text-slate-50 opacity-50 group-hover:text-rose-50 transition-colors duration-300 pointer-events-none">
                    {step.step}
                  </div>

                  <CardHeader className="relative pb-4 pt-8 px-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="h-7 w-7" />
                      </div>
                      <span className="text-sm font-bold text-rose-400 bg-rose-50 px-3 py-1 rounded-full">
                        Step {step.step}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      {step.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative px-8 pb-8 text-slate-600 leading-relaxed text-lg">
                    {step.desc}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Values Section */}
        <Section id="values" className="mt-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              The principles that anchor every decision we make and feature we
              build.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: HandHeart,
                title: "Human First",
                desc: "We design every workflow with empathy, prioritizing the well-being of donors and patients above all.",
              },
              {
                icon: ShieldCheck,
                title: "Trust by Default",
                desc: "Security isn't an afterthought. We ensure transparent systems and fully verifiable actions.",
              },
              {
                icon: Sparkles,
                title: "Practical Innovation",
                desc: "We use modern tech to solve yesterday’s bottlenecks, making the donation process frictionless.",
              },
            ].map((v, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600">
                        <v.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">
                        {v.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-600 leading-relaxed">
                    {v.desc}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Blood Components Section */}
        <Section id="components" className="mt-32 pb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Blood Components We Support
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              We match at the component level to ensure the right unit gets to
              the right patient at the right time.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {["Whole Blood", "PRBC", "Plasma", "Platelets"].map((c, idx) => (
              <motion.div key={c} variants={fadeUp}>
                <Card className="relative overflow-hidden rounded-3xl border-rose-100 bg-gradient-to-br from-white to-rose-50/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  {/* Decorative faint background droplet */}
                  <Droplet className="absolute -bottom-4 -right-4 h-24 w-24 text-rose-500 opacity-[0.03] rotate-12 pointer-events-none" />

                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-3 text-rose-600">
                      <div className="p-2 bg-rose-100 rounded-xl">
                        <Droplet className="h-5 w-5 fill-rose-500/20" />
                      </div>
                      <span className="font-bold text-lg text-slate-900 tracking-tight">
                        {c}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Stock visibility, precise eligibility rules, and smart
                      request routing tailored for {c.toLowerCase()}.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="team" className="mt-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Meet the Team
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              The humans behind the code, working to ensure no one has to wait
              for life-saving blood.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {teamMembers.map((member, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="group rounded-3xl border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden">
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Social Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex gap-4">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-rose-500 transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-rose-500 transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.mail && (
                          <a
                            href={`mailto:${member.social.mail}`}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-rose-500 transition-colors"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="text-center pt-6 pb-2">
                    <CardTitle className="text-xl font-bold text-slate-900">
                      {member.name}
                    </CardTitle>
                    <p className="text-rose-600 font-semibold text-sm uppercase tracking-wider uppercase">
                      {member.role}
                    </p>
                  </CardHeader>

                  <CardContent className="text-center px-6 pb-8">
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>
        <Section id="faq" className="mt-32">
          <FAQSection />

        </Section>
      </div>
    </div>
  );
};

export default About;
