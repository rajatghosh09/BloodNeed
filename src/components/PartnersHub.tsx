'use client';

import { useEffect, useRef, ReactElement } from 'react';

type Partner = {
    title: string;
    desc: string;
    bullets: string[];
    badges: string[];
    cta: string;
    icon: ReactElement;
    color: string;
};

const partners: Partner[] = [
    {
        title: 'Hospitals & Blood Banks',
        desc: 'Manage real-time blood requests, crossmatch workflows, and full traceability with SLA tracking.',
        bullets: [
            'HL7 / FHIR Integration',
            'Bedside Scan & Issue',
            'Cold-chain Compliance',
            'Automated Billing'
        ],
        badges: ['HL7', 'FHIR', 'NABH'],
        cta: 'Request Access',
        icon: (
            <path d="M3 21V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13M12 2v6M9 4h6M8 12h8M8 16h8M6 21v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"
                fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
            />
        ),
        color: 'from-rose-500/10 to-red-500/10',
    },
    {
        title: 'Diagnostic Labs',
        desc: 'Optimize plasma, platelet, and component workflows with QC automation and expiry tracking.',
        bullets: [
            'Component Reservations',
            'QC & Quarantine',
            'Expiry Monitoring',
            'API / CSV Export'
        ],
        badges: ['ISO 15189', 'LIS API'],
        cta: 'Connect Lab',
        icon: (
            <path d="M6 2v6l6 10 6-10V2M4 20h16"
                fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
            />
        ),
        color: 'from-emerald-500/10 to-teal-500/10',
    },
    {
        title: 'NGOs & CSR Programs',
        desc: 'Plan and execute donation drives while tracking impact with transparent reporting tools.',
        bullets: [
            'Camp Planning Tools',
            'Volunteer Management',
            'Impact Reports',
            'CSR Branding Support'
        ],
        badges: ['MoU', 'GST'],
        cta: 'Partner With Us',
        icon: (
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
            />
        ),
        color: 'from-amber-500/10 to-orange-500/10',
    },
    {
        title: 'Logistics & Ambulance',
        desc: 'Enable temperature-controlled routing, real-time tracking, and verified delivery confirmation.',
        bullets: [
            'Live Temperature Logs',
            'Smart Route Optimization',
            'e-POD & OTP Delivery',
            'Recall Management'
        ],
        badges: ['GDP', 'Webhooks'],
        cta: 'Enable Logistics',
        icon: (
            <path d="M3 7h11l4 4v6H3zM18 17a3 3 0 1 0 6 0M6 17a3 3 0 1 0 6 0"
                fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
            />
        ),
        color: 'from-indigo-500/10 to-sky-500/10',
    },
];

const PartnersHub = () => {
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        (e.target as HTMLElement).classList.add('opacity-100', 'translate-y-0');
                        io.unobserve(e.target);
                    }
                }),
            { threshold: 0.2 }
        );

        cardsRef.current.forEach((el) => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <section id="partners" className="relative bg-gradient-to-b from-white to-rose-50/40 py-20">
            <div className="mx-auto max-w-7xl px-4">

                {/* Header */}
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">
                        Partnership Ecosystem
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        <span className="text-red-600">Collaborate Across</span> the Blood Supply Chain
                    </h2>
                    <p className="mt-4 text-slate-600 sm:text-lg">
                        A unified digital infrastructure connecting hospitals, labs, NGOs, and logistics —
                        ensuring speed, transparency, and compliance.
                    </p>
                </header>

                {/* Cards */}
                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {partners.map((p, i) => (
                        <div
                            key={p.title}
                            ref={(el) => { if (el) cardsRef.current[i] = el; }}
                            className="
    group relative overflow-hidden rounded-3xl border border-slate-200/70
    bg-white/80 backdrop-blur-xl p-6 shadow-sm
    opacity-0 translate-y-6 transition-all duration-700
    hover:-translate-y-3
    hover:shadow-[0_20px_60px_-10px_rgba(244,63,94,0.25)]
  "
                        >

                            {/* Gradient border glow */}
                            <div className="
    absolute inset-0 rounded-3xl opacity-0
    transition-opacity duration-500
    group-hover:opacity-100
    pointer-events-none
    bg-gradient-to-r from-rose-400/20 via-pink-400/20 to-red-400/20
    blur-xl
  " />

                            {/* Light sweep animation */}
                            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                                <div className="
      absolute -left-full top-0 h-full w-1/2
      bg-gradient-to-r from-transparent via-white/40 to-transparent
      transition-all duration-700
      group-hover:left-full
    " />
                            </div>

                            {/* Icon */}
                            <div className="
    relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl
    bg-white shadow-sm ring-1 ring-slate-200
    transition-all duration-500
    group-hover:scale-110 group-hover:rotate-6
    group-hover:shadow-lg
  ">
                                <div className="absolute inset-0 rounded-2xl bg-rose-500/10 scale-0 group-hover:scale-125 transition-transform duration-500" />
                                <svg viewBox="0 0 24 24" className="relative h-6 w-6 text-rose-600">
                                    {p.icon}
                                </svg>
                            </div>

                            <h3 className="relative text-lg font-semibold text-slate-900">
                                {p.title}
                            </h3>

                            <p className="relative mt-2 text-sm text-slate-600 leading-relaxed">
                                {p.desc}
                            </p>

                            <ul className="relative mt-4 space-y-2">
                                {p.bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            <div className="relative mt-4 flex flex-wrap gap-2">
                                {p.badges.map((b) => (
                                    <span
                                        key={b}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-all duration-300 group-hover:bg-white"
                                    >
                                        {b}
                                    </span>
                                ))}
                            </div>

                            <div className="relative mt-6">
                                <a
                                    href="#partner-contact"
                                    className="
        inline-flex items-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white
        shadow-md transition-all duration-300
        hover:bg-rose-700 hover:shadow-rose-300/40 hover:shadow-lg
        hover:-translate-y-0.5 active:scale-95
      "
                                >
                                    {p.cta}
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    >
                                        <path
                                            d="M5 12h14M13 5l7 7-7 7"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PartnersHub;