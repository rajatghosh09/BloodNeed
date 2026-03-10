'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Users } from 'lucide-react';
import { BloodType } from '@/typescript/type/blood.compatibility';


const donorsToRecipients: Record<BloodType, BloodType[]> = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'],
};

const recipientsToDonors: Record<BloodType, BloodType[]> = {
    'O-': ['O-'],
    'O+': ['O-', 'O+'],
    'A-': ['O-', 'A-'],
    'A+': ['O-', 'O+', 'A-', 'A+'],
    'B-': ['O-', 'B-'],
    'B+': ['O-', 'O+', 'B-', 'B+'],
    'AB-': ['O-', 'A-', 'B-', 'AB-'],
    'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

const allBloodTypes: BloodType[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export default function BloodCompatibilitySection({
    defaultType = 'O+',
}: { defaultType?: BloodType }) {

    const [type, setType] = useState<BloodType>(defaultType);

    const recipients = useMemo(() => donorsToRecipients[type], [type]);
    const donors = useMemo(() => recipientsToDonors[type], [type]);

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mt-6 mx-auto w-full max-w-7xl px-4 py-16 sm:py-20"
        >

            {/* Background Glow */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-20"
                aria-hidden
                style={{
                    background:
                        'radial-gradient(40rem 20rem at 10% 10%, #ff3b3b33, transparent), radial-gradient(40rem 20rem at 90% 30%, #ff000033, transparent)'
                }}
            />

            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold">
                    <span className="text-red-500">Blood</span> Compatibility Guide
                </h1>
                <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-red-600/80" />
                <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-600">
                    See who can <span className="font-semibold text-red-700">receive</span> from you and who you can{' '}
                    <span className="font-semibold text-red-700">receive</span> from — at a glance.
                </p>
            </div>

            <div className="rounded-2xl border border-red-200 bg-white shadow-xl shadow-red-100/30">

                {/* Top Section */}
                <div className="flex flex-col gap-4 border-b border-red-100 p-6 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="text-xl font-extrabold text-red-700 sm:text-2xl">
                            Compatibility for{' '}
                            <span className="underline decoration-red-400">{type}</span>
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Based on ABO and Rh (+/−) compatibility rules.
                        </p>
                    </div>

                    {/* Blood Type Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                        {allBloodTypes.map((t) => {
                            const active = t === type;
                            return (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${active
                                            ? 'bg-red-600 text-white shadow-md shadow-red-300/50 scale-105'
                                            : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 hover:scale-105'
                                        }`}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Animated Content */}
                <motion.div
                    key={type}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-6 p-6 sm:grid-cols-5"
                >

                    {/* Recipients */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="sm:col-span-2 rounded-xl border border-red-100 bg-gradient-to-b from-white to-red-50 p-5"
                    >
                        <div className="mb-3 flex items-center gap-2 text-red-700">
                            <Users className="h-5 w-5" />
                            <h3 className="text-sm font-bold uppercase tracking-wide">
                                Eligible Recipients
                            </h3>
                        </div>

                        <p className="text-sm text-slate-700">
                            These groups can safely{' '}
                            <span className="font-semibold text-red-700">
                                receive blood from {type}
                            </span>.
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">
                            {recipients.map((r) => (
                                <li key={r}>
                                    <span className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 shadow-sm">
                                        <span className="inline-block h-2 w-2 rounded-full bg-red-600" />
                                        {r}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Donors */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="sm:col-span-2 rounded-xl border border-red-100 bg-gradient-to-b from-white to-red-50 p-5"
                    >
                        <div className="mb-3 flex items-center gap-2 text-red-700">
                            <Droplet className="h-5 w-5" />
                            <h3 className="text-sm font-bold uppercase tracking-wide">
                                Eligible Donors
                            </h3>
                        </div>

                        <p className="text-sm text-slate-700">
                            These groups can safely{' '}
                            <span className="font-semibold text-red-700">
                                donate to {type}
                            </span>.
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">
                            {donors.map((d) => (
                                <li key={d}>
                                    <span className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 shadow-sm">
                                        <span className="inline-block h-2 w-2 rounded-full bg-red-600" />
                                        {d}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="sm:col-span-1 grid gap-4"
                    >
                        <div className="rounded-xl border border-red-100 bg-white p-4">
                            <h4 className="text-sm font-bold text-red-700">
                                Why it matters
                            </h4>
                            <p className="mt-1 text-sm text-slate-700">
                                Incompatible transfusions can trigger severe immune reactions.
                            </p>
                        </div>

                        <div className="rounded-xl border border-red-100 bg-white p-4">
                            <h4 className="text-sm font-bold text-red-700">
                                Did you know?
                            </h4>
                            <p className="mt-1 text-sm text-slate-700">
                                <span className="font-semibold">AB+</span> is universal recipient,
                                <span className="font-semibold"> O−</span> is universal donor.
                            </p>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </motion.section>
    );
}