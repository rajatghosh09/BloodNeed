import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import {
  Zap, User, Building2, AlertTriangle, MapPin,
  BarChart3, Calendar, Database, ShieldCheck, LucideIcon
} from 'lucide-react';
import './MagicBento.css';

// --- Constants ---
const DEFAULT_PARTICLE_COUNT = 12;
// const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '255, 0, 0';
const MOBILE_BREAKPOINT = 768;

// --- Interfaces ---
interface CardDataItem {
  title: string;
  description: string;
  label: string;
  icon: LucideIcon;
}

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

interface FeaturesProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

// --- Data ---
const cardData: CardDataItem[] = [
  { title: 'Real-time Matching', description: 'Instantly connect donors based on type and location', label: 'Connect', icon: Zap },
  { title: 'Donor Management', description: 'Track donation history and eligibility', label: 'Profile', icon: User },
  { title: 'Hospital Integration', description: 'API for hospitals to manage blood supplies', label: 'Hospital', icon: Building2 },
  { title: 'Emergency Alerts', description: 'Notifications when your blood is critically needed', label: 'Urgent', icon: AlertTriangle },
  { title: 'Location Tracking', description: 'GPS-based system for donation centers', label: 'Location', icon: MapPin },
  { title: 'Impact Analytics', description: 'Track lives saved and community contribution', label: 'Impact', icon: BarChart3 },
  { title: 'Donation Scheduling', description: 'Book appointments at your convenience', label: 'Schedule', icon: Calendar },
  { title: 'Blood Inventory', description: 'Manage blood supplies with expiry monitoring', label: 'Inventory', icon: Database },
  { title: 'Verification System', description: 'Secure credential verification', label: 'Verified', icon: ShieldCheck }
];

// --- Helper Functions ---
const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

// --- Sub-Components ---

const ParticleCard: React.FC<ParticleCardProps> = ({
  children, className = '', disableAnimations = false, style,
  particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  // const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => p.remove() });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const p = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
        cardRef.current.appendChild(p);
        particlesRef.current.push(p);

        gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(p, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          duration: 2 + Math.random() * 2,
          repeat: -1, yoyo: true, ease: 'none'
        });
      }, i * 100);
      timeoutsRef.current.push(timeoutId);
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || disableAnimations) return;

    const onMouseEnter = () => { isHoveredRef.current = true; animateParticles(); };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.3 });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (enableTilt) {
        const rX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
        const rY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
        gsap.to(el, { rotateX: rX, rotateY: rY, duration: 0.1, transformPerspective: 1000 });
      }
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mousemove', onMouseMove);
    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt]);

  return <div ref={cardRef} className={`${className} particle-container`} style={style}>{children}</div>;
};

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({ gridRef, disableAnimations, enabled, spotlightRadius, glowColor }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `position: fixed; width: 600px; height: 600px; border-radius: 50%; pointer-events: none; z-index: 200; opacity: 0; transform: translate(-50%, -50%); background: radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, transparent 70%);`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const onMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, opacity: 0.8, duration: 0.2 });

      const cards = gridRef.current.querySelectorAll<HTMLElement>('.magic-bento-card');
      cards.forEach(card => updateCardGlowProperties(card, e.clientX, e.clientY, 1, spotlightRadius || 300));
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      spotlight.remove();
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// --- Main Component ---
const Features: React.FC<FeaturesProps> = (props) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const {
    textAutoHide = true, enableSpotlight = true,
    enableBorderGlow = true, glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true, particleCount = DEFAULT_PARTICLE_COUNT
  } = props;

  return (
    <section className="relative py-20 overflow-hidden px-4">
      {/* Background blobs (Framer Motion) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-red-500/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      </div>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold"><span className="text-red-600">Fea</span>tures</h1>
        <p className="text-gray-400 mt-4">Powerful tools for blood donation coordination.</p>
      </div>

      {enableSpotlight && <GlobalSpotlight gridRef={gridRef} glowColor={glowColor} enabled={!isMobile} />}

      <div className="card-grid bento-section max-w-7xl mx-auto" ref={gridRef}>
        {cardData.map((card, i) => (
          <ParticleCard
            key={i}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={enableTilt}
            className={`magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`}
          >
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__icon"><card.icon size={24} /></div>
              <div className="magic-bento-card__label">{card.label}</div>
            </div>
            <div className="magic-bento-card__content">
              <h2 className="magic-bento-card__title">{card.title}</h2>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </ParticleCard>
        ))}
      </div>
    </section>
  );
};

export default Features;