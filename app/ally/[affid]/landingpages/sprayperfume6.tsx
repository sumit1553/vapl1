'use client';

import React, {  useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * Immersive Perfume Spray Experience (Next.js App Router / TSX)
 * - Bottle at bottom center
 * - Curved mist + shimmer + drift
 * - Memory scene fade-in (3 presets)
 * - Compliment text bubble
 * - Spray SFX + ambient loop per scene
 *
 * Drop asset placeholders into /public:
 *  - /perfume-bottle.png  (transparent PNG)
 *  - /audio/spray.mp3     (short "pssst" sound ~0.5s)
 *  - /audio/ambient-beach.mp3
 *  - /audio/ambient-garden.mp3
 *  - /audio/ambient-cafe.mp3
 *  - /bg/beach.jpg
 *  - /bg/garden.jpg
 *  - /bg/cafe.jpg
 */

type Particle = {
  id: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  driftX: number;
  driftY: number;
  size: number;
  opacity: number;
  color: string;
  blur: number;
  isShimmer: boolean;
};

type Scene = {
  id: string;
  label: string;
  bg: string; // image url (in /public)
  ambient: string; // audio url (in /public)
  tint: string; // rgba/gradient for haze tint
  mist: string; // css gradient color for mist
  shimmer: string; // css gradient color for shimmer
};

const SCENES: Scene[] = [
  {
    id: 'seaside',
    label: 'Seaside Escape',
    bg: '/bg/beach.png',
    ambient: '/audio/ambient-beach.mp3',
    tint: 'radial-gradient(circle, rgba(205,236,255,0.35) 0%, rgba(255,255,255,0.15) 100%)',
    mist: 'radial-gradient(circle, rgba(211,244,255,0.85) 0%, rgba(211,244,255,0) 70%)',
    shimmer: 'radial-gradient(circle, rgba(255,245,200,0.95) 0%, rgba(255,245,200,0) 70%)',
  },
  {
    id: 'garden',
    label: 'Spring Garden',
    bg: '/bg/garden.png',
    ambient: '/audio/ambient-garden.mp3',
    tint: 'radial-gradient(circle, rgba(255,228,235,0.45) 0%, rgba(255,240,245,0.2) 100%)',
    mist: 'radial-gradient(circle, rgba(255,192,203,0.85) 0%, rgba(255,192,203,0) 70%)',
    shimmer: 'radial-gradient(circle, rgba(255,223,150,0.95) 0%, rgba(255,223,150,0) 70%)',
  },
  {
    id: 'cafe',
    label: 'Paris Café',
    bg: '/bg/cafe.png',
    ambient: '/audio/ambient-cafe.mp3',
    tint: 'radial-gradient(circle, rgba(255,236,210,0.35) 0%, rgba(255,248,240,0.18) 100%)',
    mist: 'radial-gradient(circle, rgba(240,220,200,0.85) 0%, rgba(240,220,200,0) 70%)',
    shimmer: 'radial-gradient(circle, rgba(255,240,200,0.95) 0%, rgba(255,240,200,0) 70%)',
  },
];

const COMPLIMENTS = [
  'You smell amazing ✨',
  'That’s sheer elegance.',
  'Instantly unforgettable.',
  'Confidence looks good on you.',
  'A whisper of perfection.',
  'You just turned heads.',
];

export default function ImmersivePerfumeExperience() {
  const [scene, setScene] = useState<Scene>(SCENES[1]); // default: Garden
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showHaze, setShowHaze] = useState(false);
  const [bgActive, setBgActive] = useState(false);
  const [compliment, setCompliment] = useState<string | null>(null);

  // Audio refs
  const sprayRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  // Lazy-create audio elements (avoids SSR issues)
  const ensureSpray = () => {
    if (!sprayRef.current) {
      const a = new Audio('/audio/spray.mp3');
      a.volume = 0.8;
      sprayRef.current = a;
    }
  };
  const ensureAmbient = () => {
    if (!ambientRef.current) {
      const a = new Audio(scene.ambient);
      a.loop = true;
      a.volume = 0.0;
      ambientRef.current = a;
    }
  };

  // When scene changes, swap ambient track
  React.useEffect(() => {
    if (ambientRef.current) {
      try { ambientRef.current.pause(); } catch {}
      ambientRef.current = null;
    }
    // Preload new ambient silently
    const a = new Audio(scene.ambient);
    a.loop = true;
    a.volume = 0.0;
    ambientRef.current = a;
  }, [scene]);

  const sprayOnce = () => {
    ensureSpray();
    ensureAmbient();
    try { sprayRef.current!.currentTime = 0; sprayRef.current!.play(); } catch {}
    try { ambientRef.current!.play(); } catch {}
    // Fade in ambient, then fade out after 6s
    const amb = ambientRef.current!;
    let v = 0.0;
    const up = setInterval(() => {
      v = Math.min(0.35, v + 0.05);
      amb.volume = v;
      if (v >= 0.35) clearInterval(up);
    }, 120);
    setTimeout(() => {
      const down = setInterval(() => {
        v = Math.max(0.0, v - 0.04);
        amb.volume = v;
        if (v <= 0.0) {
          amb.pause();
          clearInterval(down);
        }
      }, 160);
    }, 6000);
  };

  const handleSpray = () => {
    const bottleX = window.innerWidth / 2; // center
    const bottleY = window.innerHeight - 160; // approximate nozzle height

    // Compliment & haze & background
    setCompliment(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);
    setShowHaze(true);
    setBgActive(true);
    setTimeout(() => setShowHaze(false), 3800);

    sprayOnce();

    // Generate particles
    const burst: Particle[] = Array.from({ length: 40 }).map((_, i) => {
      const angle = (Math.random() - 0.5) * 34; // ±17°
      const distance = 180 + Math.random() * 220;
      const rad = (angle * Math.PI) / 180;

      const endX = bottleX + Math.cos(rad) * distance;
      const endY = bottleY - Math.sin(rad) * distance;

      const curveLift = 60 + Math.random() * 60;
      const midX = (bottleX + endX) / 2 + (Math.random() - 0.5) * 50;
      const midY = ((bottleY + endY) / 2) - curveLift;

      const driftX = endX + (Math.random() - 0.5) * 80;
      const driftY = endY - (Math.random() * 26 + 12);

      const isShimmer = Math.random() < 0.28;
      const size = isShimmer ? 2 + Math.random() * 3 : 6 + Math.random() * 14;
      const opacity = isShimmer ? 0.85 + Math.random() * 0.15 : 0.42 + Math.random() * 0.32;
      const color = isShimmer ? scene.shimmer : scene.mist;
      const blur = isShimmer ? 0 : 0.6 + Math.random() * 1.6;

      return {
        id: Date.now() + i,
        startX: bottleX,
        startY: bottleY,
        midX,
        midY,
        endX,
        endY,
        driftX,
        driftY,
        size,
        opacity,
        color,
        blur,
        isShimmer,
      };
    });

    setParticles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setParticles((prev) => prev.slice(burst.length));
      setBgActive(false); // fade memory scene back
      setCompliment(null);
    }, 5200);
  };

  const SceneButton: React.FC<{ s: Scene; active: boolean; onClick: () => void }> = ({ s, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm md:text-base shadow-sm transition-all ${active ? 'bg-black text-white' : 'bg-white/80 text-black hover:bg-white'}`}
      style={{ backdropFilter: 'blur(4px)' }}
    >
      {s.label}
    </button>
  );

  // Light flare near the nozzle when spraying
  const [flare, setFlare] = useState(0);
  const triggerFlare = () => {
    setFlare((n) => n + 1);
    setTimeout(() => setFlare((n) => n + 1), 300);
  };

  const onSprayClick = () => {
    triggerFlare();
    handleSpray();
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-rose-50">
      {/* Memory background layer */}
      <AnimatePresence>
        {bgActive && (
          <motion.div
            key={scene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="pointer-events-none fixed inset-0"
            style={{
              backgroundImage: `url(${scene.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2px) saturate(1.05)',
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>

      {/* Haze tint */}
      <AnimatePresence>
        {showHaze && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.38 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="pointer-events-none fixed inset-0" 
            style={{ background: scene.tint, backdropFilter: 'blur(8px)', zIndex: 20 }}
          />
        )}
      </AnimatePresence>

      {/* Top controls */}
      <div className="fixed top-4 inset-x-0 z-40 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 shadow-sm" style={{backdropFilter:'blur(6px)'}}>
          {SCENES.map((s) => (
            <SceneButton key={s.id} s={s} active={s.id===scene.id} onClick={() => setScene(s)} />
          ))}
        </div>

        <button
          onClick={onSprayClick}
          className="px-5 py-2 rounded-full bg-rose-500 text-white font-semibold shadow-lg hover:bg-rose-600 active:scale-95 transition"
        >
          Spray
        </button>
      </div>

      {/* Compliment bubble */}
      <AnimatePresence>
        {compliment && (
          <motion.div
            key={compliment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="fixed left-1/2 -translate-x-1/2 top-24 z-50 px-4 py-2 rounded-full bg-white/90 text-gray-900 shadow-md"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {compliment}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.startX, y: p.startY, opacity: p.isShimmer ? 0 : p.opacity, scale: 1 }}
          animate={{
            x: [p.startX, p.midX, p.endX, p.driftX],
            y: [p.startY, p.midY, p.endY, p.driftY],
            opacity: [p.isShimmer ? 0 : p.opacity, p.opacity, 0],
            scale: 0.35,
          }}
          transition={{ duration: p.isShimmer ? 4.2 : 3.8, ease: 'easeOut' }}
          className="fixed pointer-events-none"
          style={{
            left: 0, top: 0, width: p.size, height: p.size, borderRadius: 9999,
            background: p.color, filter: `blur(${p.blur}px)`, zIndex: 30 + (p.isShimmer ? 2 : 0),
          }}
        />
      ))}

      {/* Nozzle light flare (very quick) */}
      <AnimatePresence>
        <motion.div
          key={`flare-${flare}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.8, scale: 1.1 }}
          exit={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed" style={{ left: '50%', bottom: 160, transform: 'translateX(-50%)', zIndex: 32,
            width: 80, height: 80, borderRadius: 9999, background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)' }}
        />
      </AnimatePresence>

      {/* Bottle */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-25 select-none">
        {/* <img src="/perfume-bottle.png" alt="Perfume Bottle" className="w-28 md:w-32 pointer-events-none" /> */}
        <Image src="/perfume-bottle.png" alt="Perfume Bottle" className="w-28 md:w-32 pointer-events-none" />
      
      </div>

      {/* Audio elements are created dynamically via new Audio() */}
    </div>
  );
}
