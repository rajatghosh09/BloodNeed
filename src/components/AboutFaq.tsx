"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ---------------- FAQ Data ---------------- */
const FAQ_DATA = {
  description: "Find answers to common questions about blood donation and how our platform helps connect lives.",
  email: "support@bloodneed.com",
  items: [
    {
      question: "Who can donate blood?",
      answer: "Generally, donors must be at least 18 years old, weigh at least 50kg, and be in good general health. Specific eligibility may vary based on medical history.",
    },
    {
      question: "How long does the donation process take?",
      answer: "The entire process, from registration to recovery, usually takes about 45-60 minutes. The actual blood draw only takes about 10 minutes.",
    },
    {
      question: "How often can I donate blood?",
      answer: "You can typically donate whole blood every 56 days (8 weeks). This allows your body enough time to replenish its red blood cell count.",
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, <strong>Blood Need</strong> uses end-to-end encryption. Your contact details are only shared with verified medical facilities or matched donors when you approve.",
    },
  ],
};

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative overflow-clip bg-slate-50">

      {/* Animated background Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 h-32 w-32 rounded-full bg-red-200/40 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left side - Title and description */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
                Common <br />
                <span className="text-red-600">Questions</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                {FAQ_DATA.description}
              </p>

              {/* Help Box - Changed to Medical Blue theme */}
              <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100 shadow-sm shadow-blue-900/5">
                <p className="font-semibold text-blue-950 mb-1">Need more help?</p>
                <p className="text-blue-800 text-sm mb-4">Our team is available 24/7 for urgent inquiries.</p>
                <a
                  href={`mailto:${FAQ_DATA.email}`}
                  className="inline-flex items-center font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  {FAQ_DATA.email}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right side - Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQ_DATA.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 rounded-2xl px-6 bg-white shadow-sm hover:shadow-md hover:border-blue-200 hover:shadow-blue-100/50 transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-semibold py-5 text-slate-900 hover:text-red-700 hover:no-underline text-lg transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5 leading-relaxed text-base">
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;