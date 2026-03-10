"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Send, Droplet, Phone, AtSign, LoaderCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

 async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // 1. SAVE THE FORM REFERENCE HERE!
    const form = e.currentTarget; 
    
    // 2. Use 'form' instead of 'e.currentTarget'
    const formData = new FormData(form); 
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const topic = formData.get("topic") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("contact").insert([
      { name, email, phone, topic, message },
    ]);

    setLoading(false);

    if (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
      return;
    }

    form.reset(); 
    setPopup(true);
    // toast.success("Message sent successfully!");
    
    setTimeout(() => setPopup(false), 3000);
  }

  // Animation variants for the form fields
  const formContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const formItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const inputClass = "w-full rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:-translate-y-0.5 outline-none transition-all duration-300 shadow-sm";

  return (
    <div className="relative min-h-screen bg-[#fafafa] pb-12 pt-20 overflow-hidden">

      {/* Interactive Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-red-100 to-rose-200 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -right-40 top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-rose-100 to-red-50 blur-3xl"
      />

      {/* Success Popup */}
      {popup && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed left-1/2 top-24 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-gray-900 px-6 py-4 text-sm font-medium text-white shadow-2xl shadow-gray-900/20 border border-gray-800"
          role="status"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          Message received! We&apos;ll be in touch soon.
        </motion.div>
      )}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 lg:gap-24">

        {/* LEFT SIDE: Interactive Info */}
        <div className="flex flex-col justify-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Icon replacing the logo */}
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Droplet className="h-8 w-8" fill="currentColor" />
              </motion.div>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Let&apos;s build a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
                healthier future.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-600 leading-relaxed">
              Whether you need to organize a blood drive, request emergency support, or partner with us—our team is ready to help 24/7.
            </p>
          </motion.div>

          {/* Interactive Hover Cards */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-red-100 hover:shadow-md hover:shadow-red-500/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Call Us</p>
                <p className="font-semibold text-gray-900">+91 3345668712</p>
              </div>
            </div>

            <div className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-red-100 hover:shadow-md hover:shadow-red-500/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                <AtSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Us</p>
                <p className="font-semibold text-gray-900">help@bloodneed.in</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* RIGHT SIDE: Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          {/* Decorative element behind form */}
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-red-100 via-rose-50 to-transparent opacity-50 blur-lg"></div>

          <div className="relative rounded-[2rem] border border-white bg-white/60 p-6 shadow-2xl shadow-gray-200/50 backdrop-blur-xl sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h2>

            <motion.form
              variants={formContainer}
              initial="hidden"
              animate="show"
              onSubmit={onSubmit}
              className="space-y-5"
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <motion.div variants={formItem}>
                  <Field label="Full Name">
                    <input required name="name" className={inputClass} placeholder="John Doe" />
                  </Field>
                </motion.div>
                <motion.div variants={formItem}>
                  <Field label="Email Address">
                    <input required type="email" name="email" className={inputClass} placeholder="john@example.com" />
                  </Field>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <motion.div variants={formItem}>
                  <Field label="Phone Number">
                    <input name="phone" className={inputClass} placeholder="+91 XXXXXXXXXX" />
                  </Field>
                </motion.div>
                <motion.div variants={formItem}>
                  <Field label="Topic">
                    <select name="topic" className={`${inputClass} cursor-pointer text-gray-700`}>
                      <option value="donation">Blood Donation Query</option>
                      <option value="request">Urgent Blood Request</option>
                      <option value="partnership">Hospital Partnership</option>
                      <option value="general">General Support</option>
                    </select>
                  </Field>
                </motion.div>
              </div>

              <motion.div variants={formItem}>
                <Field label="Your Message">
                  <textarea
                    required
                    name="message"
                    className={`${inputClass} h-32 resize-none`}
                    placeholder="How can we help you today?"
                  />
                </Field>
              </motion.div>

              <motion.div variants={formItem} className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-900 px-6 py-4 font-bold text-white shadow-lg transition-all hover:bg-red-600 hover:shadow-red-600/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </motion.button>
              </motion.div>

            </motion.form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Helper component
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-xs font-bold tracking-wider text-gray-500 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}