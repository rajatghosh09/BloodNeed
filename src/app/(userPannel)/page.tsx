"use client"

import BloodCompatibility from "@/components/BloodCompatibility";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import HomeSlider from "@/components/HomeSlider"
import PartnersHub from "@/components/PartnersHub";
import { Testimonials } from "@/components/Testimonials";
import { motion } from "framer-motion";


const Home = () => {
  const benefits = [{
    title: "Patients",
    description: "Sign up and request for blood you need, we'll help you find it quickly.",
    icon: "🩸"
  }, {
    title: "Donors",
    description: "Register and discover where your donation can save a life.",
    icon: "❤️"
  }, {
    title: "Hospitals",
    description: "Connect directly with donors to get blood your patients need.",
    icon: "🏥"
  }, {
    title: "Organisations",
    description: "Organize donation drives and support those in urgent need.",
    icon: "🤝"
  }];

  return (
    <>
      {/* home slider */}
      <HomeSlider  />

      {/* people and hospital */}
      <section className="relative pt-40 pb-20 px-4"
       style={{
          background:
            'radial-gradient(40rem 20rem at 10% 10%, #ff3b3b33, transparent), radial-gradient(40rem 20rem at 90% 10%, #ff000033, transparent)'
        }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-red-500">We connect</span>{" "}
              <span className="text-black dark:text-white">
                People & Hospitals
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive web-based platform that connects blood donors directly
              with hospitals, ensuring quick and efficient blood donation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {benefits.map((benefit, index) => <motion.div key={benefit.title} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.2,
              delay: index * 0.05
            }} className="flex items-start space-x-6 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg transition-all duration-500 group-hover:opacity-100 opacity-0" />
                <div className="relative text-4xl bg-background/50 p-4 rounded-full">
                  {benefit.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>)}
          </div>
        </div>
      </section>
      
      {/* blood compatibility */}
      <BloodCompatibility />
      
      {/* features */}
      <Features />
      
      {/* partners hub */}
      <PartnersHub />
      
      {/* make a difference */}
      <FinalCTA />
      
      {/* Testimonials */}
      <Testimonials/>
    </>
  )
}

export default Home