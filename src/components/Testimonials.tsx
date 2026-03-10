"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Quote, Star } from "lucide-react";

type TItem = {
    name: string;
    title: string;
    quote: string;
    img: string;
    rating?: number;
};

const testimonialsData: TItem[] = [
    {
        name: "Aarav Nair",
        title: "Blood Recipient",
        quote:
            "BloodMate connected us to a donor within hours. The process was seamless and compassionate.",
        img: "https://img.freepik.com/free-photo/indian-man-smiling_23-2148928786.jpg",
        rating: 5,
    },
    {
        name: "Ishita Sharma",
        title: "Donor",
        quote:
            "Super smooth experience! Loved the reminders and friendly follow-ups after donation.",
        img: "https://img.freepik.com/free-photo/portrait-indian-woman_23-2149123284.jpg",
        rating: 5,
    },
    {
        name: "Kunal Verma",
        title: "Hospital Coordinator",
        quote:
            "Matching and verification were spot on. We saved valuable time when it mattered most.",
        img: "https://img.freepik.com/free-photo/indian-businessman_23-2148100618.jpg",
        rating: 4,
    },
];

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const card: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Testimonials = () => {
    return (
        <section className="relative py-20 px-4">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-rose-100 -z-10" />
            <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300/20 blur-3xl rounded-full -z-10" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300/20 blur-3xl rounded-full -z-10" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-14">

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        <span className="block text-gray-800 dark:text-white pb-4">
                            <span className="text-red-600">What</span>{" "}
                            People Say
                        </span>
                    </h2>

                    <p className="mt-4 text-gray-600 text-lg">
                        Real stories from donors, recipients & hospitals
                    </p>
                </div>

                {/* Cards */}
                <motion.div
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {testimonialsData.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={card}
                            className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Glow Hover */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-10 blur-xl transition duration-500" />

                            {/* Profile */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                                    <Image
                                        src={t.img}
                                        alt={t.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {t.name}
                                    </h3>
                                    <p className="text-sm text-rose-500">{t.title}</p>
                                </div>
                                <Quote className="ml-auto text-rose-400" />
                            </div>

                            {/* Rating */}
                            {typeof t.rating === "number" && (
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={`h-4 w-4 ${idx < (t.rating ?? 0)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Quote */}
                            <p className="text-gray-700 leading-relaxed italic">
                                “{t.quote}”
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};