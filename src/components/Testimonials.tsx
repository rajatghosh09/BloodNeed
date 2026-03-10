// // "use client";

// // import Image from "next/image";
// // import { motion, Variants } from "framer-motion";
// // import { Quote, Star } from "lucide-react";

// // type TItem = {
// //   name: string;
// //   title: string;
// //   quote: string;
// //   img: string;
// //   rating?: number;
// // };

// // const testimonialsData: TItem[] = [
// //   {
// //     name: "Aarav Nair",
// //     title: "Blood Recipient",
// //     quote:
// //       "BloodMate connected us to a donor within hours. The process was seamless and compassionate.",
// //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s",
// //     rating: 5,
// //   },
// //   {
// //     name: "Ishita Sharma",
// //     title: "Donor",
// //     quote:
// //       "Super smooth experience! Loved the reminders and friendly follow‑ups after donation.",
// //     img: "https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c0927dc614ac9adfac27b_661a4b0ac0cb1ebd35610aa9_Woman.webp",
// //     rating: 5,
// //   },
// //   {
// //     name: "Kunal Verma",
// //     title: "Hospital Coordinator",
// //     quote:
// //       "Matching and verification were spot on. We saved valuable time when it mattered most.",
// //     img: "https://img.freepik.com/premium-photo/indian-office-man-unfocused-people-background-generative-ai_849906-20193.jpg",
// //     rating: 4,
// //   },

// // ];

// // const grid: Variants = {
// //   hidden: {},
// //   show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
// // };

// // const card: Variants = {
// //   hidden: { opacity: 0, y: 20, scale: 0.98 },
// //   show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
// // };

// // export function TestimonialsMosaic() {
// //   return (
// //     <section className="mx-auto w-full max-w-7xl px-4 py-16 md:py-20">

// //       <div className="mb-10 text-center md:mb-14">
// //         <div className="mb-3 flex items-center justify-center gap-4">
// //           <span className="h-px w-12 bg-amber-400/80" />
// //           <span className="text-[15px] italic font-medium text-red-500">Testimonials</span>
// //           <span className="h-px w-12 bg-amber-400/80" />
// //         </div>
// //         <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
// //           What People Say About BloodMate
// //         </h2>
// //       </div>


// //       <Spotlight items={testimonialsData.slice(0, 3)} />


// //       <motion.div
// //         variants={grid}
// //         initial="hidden"
// //         whileInView="show"
// //         viewport={{ once: true, amount: 0.2 }}
// //         className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
// //       >
// //         {testimonialsData.map((t, i) => (
// //           <motion.article
// //             key={t.name + i}
// //             variants={card}
// //             className="group relative overflow-hidden rounded-[24px] border border-rose-100 bg-white shadow-sm transition-shadow hover:shadow-md"
// //           >

// //             <div className="relative flex items-center gap-4 border-b border-rose-100 bg-rose-50/60 px-5 py-5">
// //               <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-white">
// //                 <Image src={t.img} alt={t.name} fill unoptimized className="object-cover" sizes="56px" />
// //               </div>
// //               <div className="min-w-0">
// //                 <h3 className="truncate text-base font-semibold text-rose-950">{t.name}</h3>
// //                 <p className="truncate text-sm text-rose-600">{t.title}</p>
// //               </div>
// //               <Quote className="ml-auto h-6 w-6 text-rose-500" />
// //             </div>


// //             <div className="px-5 pb-5 pt-4">
// //               {typeof t.rating === "number" && (
// //                 <div className="mb-3 flex items-center gap-1">
// //                   {Array.from({ length: 5 }).map((_, idx) => (
// //                     <Star
// //                       key={idx}
// //                       className={`h-4 w-4 ${idx < (t.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-rose-200"}`}
// //                     />
// //                   ))}
// //                   <span className="ml-2 text-xs font-medium text-rose-500">{(t.rating ?? 5).toFixed(1)}</span>
// //                 </div>
// //               )}
// //               <p className="text-[15px] leading-relaxed text-slate-700">“{t.quote}”</p>
// //             </div>


// //           </motion.article>
// //         ))}
// //       </motion.div>
// //     </section>
// //   );
// // }

// // function Spotlight({ items }: { items: TItem[] }) {
// //   return (
// //     <div className="mx-auto max-w-4xl">
// //       <motion.div
// //         initial={{ opacity: 0, y: 6 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true, amount: 0.2 }}
// //         className="relative overflow-hidden rounded-2xl border border-rose-100 bg-rose-50/40 p-6"
// //       >
// //         <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[90px_1fr]">

// //           <div className="flex items-center justify-center gap-3 md:flex-col md:justify-start">
// //             {items.map((it, idx) => (
// //               <motion.div
// //                 key={it.name + idx}
// //                 className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-white shadow-sm"
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 whileInView={{ opacity: 1, scale: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ delay: 0.05 * idx, duration: 0.4 }}
// //               >
// //                 <Image src={it.img} alt={it.name} fill unoptimized className="object-cover" sizes="64px" />
// //               </motion.div>
// //             ))}
// //           </div>


// //           <Cycler items={items} />
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // function Cycler({ items }: { items: TItem[] }) {

// //   const duration = 4_000;

// //   return (
// //     <div className="relative min-h-[110px]">
// //       {items.map((it, i) => (
// //         <motion.blockquote
// //           key={it.name + i}
// //           initial={{ opacity: 0, y: 10 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ delay: i * (duration / 4000), duration: 0.5 }}
// //           className="absolute inset-0"
// //           style={{ animation: `fadeCycle ${duration * items.length}ms linear ${i * duration}ms infinite` }}
// //         >
// //           <p className="text-lg leading-relaxed text-rose-950">“{it.quote}”</p>
// //           <footer className="mt-3 text-sm font-semibold text-rose-700">
// //             {it.name} <span className="font-normal text-rose-500">• {it.title}</span>
// //           </footer>
// //         </motion.blockquote>
// //       ))}

// //       <style jsx>{`
// //         @keyframes fadeCycle {
// //           0% { opacity: 0 }
// //           5% { opacity: 1 }
// //           28% { opacity: 1 }
// //           33% { opacity: 0 }
// //           100% { opacity: 0 }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }


// "use client";

// import Image from "next/image";
// import { motion, Variants } from "framer-motion";
// import { Quote, Star } from "lucide-react";

// type TItem = {
//   name: string;
//   title: string;
//   quote: string;
//   img: string;
//   rating?: number;
// };

// const testimonialsData: TItem[] = [
//   {
//     name: "Aarav Nair",
//     title: "Blood Recipient",
//     quote:
//       "BloodMate connected us to a donor within hours. The process was seamless and compassionate.",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s",
//     rating: 5,
//   },
//   {
//     name: "Ishita Sharma",
//     title: "Donor",
//     quote:
//       "Super smooth experience! Loved the reminders and friendly follow-ups after donation.",
//     img: "https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c0927dc614ac9adfac27b_661a4b0ac0cb1ebd35610aa9_Woman.webp",
//     rating: 5,
//   },
//   {
//     name: "Kunal Verma",
//     title: "Hospital Coordinator",
//     quote:
//       "Matching and verification were spot on. We saved valuable time when it mattered most.",
//     img: "https://img.freepik.com/premium-photo/indian-office-man-unfocused-people-background-generative-ai_849906-20193.jpg",
//     rating: 4,
//   },
// ];

// const grid: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
// };

// const card: Variants = {
//   hidden: { opacity: 0, y: 20, scale: 0.98 },
//   show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
// };

// export const Testimonials = () => {
//   return (
//     <section className="mx-auto w-full max-w-7xl px-4 py-16 md:py-20">
//       {/* Header */}
//       <div className="mb-10 text-center md:mb-14">
//         <div className="mb-3 flex items-center justify-center gap-4">
//           <span className="h-px w-12 bg-amber-400/80" />
//           <span className="text-[15px] italic font-medium text-red-500">
//             Testimonials
//           </span>
//           <span className="h-px w-12 bg-amber-400/80" />
//         </div>
//         <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
//           What People Say About BloodMate
//         </h2>
//       </div>

//       <Spotlight items={testimonialsData.slice(0, 3)} />

//       <motion.div
//         variants={grid}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//         className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         {testimonialsData.map((t, i) => (
//           <motion.article
//             key={t.name + i}
//             variants={card}
//             className="group relative overflow-hidden rounded-[24px] border border-rose-100 bg-white shadow-sm transition-shadow hover:shadow-md"
//           >
//             {/* Header */}
//             <div className="relative flex items-center gap-4 border-b border-rose-100 bg-rose-50/60 px-5 py-5">
//               <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-white">
//                 <Image
//                   src={t.img}
//                   alt={t.name}
//                   fill
//                   unoptimized
//                   className="object-cover"
//                   sizes="56px"
//                 />
//               </div>
//               <div className="min-w-0">
//                 <h3 className="truncate text-base font-semibold text-rose-950">
//                   {t.name}
//                 </h3>
//                 <p className="truncate text-sm text-rose-600">{t.title}</p>
//               </div>
//               <Quote className="ml-auto h-6 w-6 text-rose-500" />
//             </div>

//             {/* Body */}
//             <div className="px-5 pb-5 pt-4">
//               {typeof t.rating === "number" && (
//                 <div className="mb-3 flex items-center gap-1">
//                   {Array.from({ length: 5 }).map((_, idx) => (
//                     <Star
//                       key={idx}
//                       className={`h-4 w-4 ${
//                         idx < (t.rating ?? 0)
//                           ? "fill-amber-400 text-amber-400"
//                           : "text-rose-200"
//                       }`}
//                     />
//                   ))}
//                   <span className="ml-2 text-xs font-medium text-rose-500">
//                     {(t.rating ?? 5).toFixed(1)}
//                   </span>
//                 </div>
//               )}
//               <p className="text-[15px] leading-relaxed text-slate-700">
//                 “{t.quote}”
//               </p>
//             </div>
//           </motion.article>
//         ))}
//       </motion.div>
//     </section>
//   );
// };

// const Spotlight = ({ items }: { items: TItem[] }) => {
//   return (
//     <div className="mx-auto max-w-4xl">
//       <motion.div
//         initial={{ opacity: 0, y: 6 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.2 }}
//         className="relative overflow-hidden rounded-2xl border border-rose-100 bg-rose-50/40 p-6"
//       >
//         <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[90px_1fr]">
//           <div className="flex items-center justify-center gap-3 md:flex-col md:justify-start">
//             {items.map((it, idx) => (
//               <motion.div
//                 key={it.name + idx}
//                 className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-white shadow-sm"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.05 * idx, duration: 0.4 }}
//               >
//                 <Image
//                   src={it.img}
//                   alt={it.name}
//                   fill
//                   unoptimized
//                   className="object-cover"
//                   sizes="64px"
//                 />
//               </motion.div>
//             ))}
//           </div>

//           <Cycler items={items} />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const Cycler = ({ items }: { items: TItem[] }) => {
//   const duration = 4000;

//   return (
//     <div className="relative min-h-[110px]">
//       {items.map((it, i) => (
//         <motion.blockquote
//           key={it.name + i}
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: i * (duration / 4000), duration: 0.5 }}
//           className="absolute inset-0"
//           style={{
//             animation: `fadeCycle ${
//               duration * items.length
//             }ms linear ${i * duration}ms infinite`,
//           }}
//         >
//           <p className="text-lg leading-relaxed text-rose-950">
//             “{it.quote}”
//           </p>
//           <footer className="mt-3 text-sm font-semibold text-rose-700">
//             {it.name}
//             <span className="font-normal text-rose-500">
//               {" "}• {it.title}
//             </span>
//           </footer>
//         </motion.blockquote>
//       ))}

//       <style jsx>{`
//         @keyframes fadeCycle {
//           0% { opacity: 0 }
//           5% { opacity: 1 }
//           28% { opacity: 1 }
//           33% { opacity: 0 }
//           100% { opacity: 0 }
//         }
//       `}</style>
//     </div>
//   );
// };


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