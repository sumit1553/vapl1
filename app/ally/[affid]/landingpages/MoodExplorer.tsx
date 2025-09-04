
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import {  Star,  Sparkles, Play, Pause, ChevronRight, SprayCan } from "lucide-react";
import {  Play, Pause, ChevronRight } from "lucide-react";




// ---------- Utility Components ----------
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);


const Button: React.FC<React.PropsWithChildren<{ onClick?: () => void; variant?: "primary" | "ghost" | "outline"; className?: string; as?: "button" | "a"; href?: string }> > = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  as = "button",
  href,
}) => {
  const base = "rounded-2xl px-5 py-3 text-sm font-semibold transition shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-zinc-800"
      : variant === "outline"
      ? "border border-black text-black hover:bg-black hover:text-white"
      : "text-black/80 hover:text-black";
  if (as === "a" && href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>{children}</a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>{children}</button>
  );
};




// ---------- Mood Explorer (video cards + modal + audio) ----------

type Mood = {
  name: string;
  video: string;
  audio: string;
  tagline: string;
  perfumes: { name: string; notes: string }[];
  backgroundEffect: "waves" | "petals" | "steam";
};

const moods: Mood[] = [
  {
    name: "Beach",
    video: "/videos/mood-beach.mp4",
    audio: "/audio/beach-waves.mp3",
    tagline: "Fresh. Breezy. Ocean Escape.",
    perfumes: [
      { name: "Azure Mist", notes: "Citrus • Sea Salt • Musk" },
      { name: "Ocean Drift", notes: "Bergamot • Marine • Amber" },
    ],
    backgroundEffect: "waves",
  },
  {
    name: "Garden",
    video: "/videos/mood-garden.mp4",
    audio: "/audio/garden-birds.mp3",
    tagline: "Bloom with Nature.",
    perfumes: [
      { name: "Floral Serenade", notes: "Rose • Jasmine • Sandalwood" },
      { name: "Green Whisper", notes: "Herbs • Lily • Vetiver" },
    ],
    backgroundEffect: "petals",
  },
  {
    name: "Café",
    video: "/videos/mood-cafe.mp4",
    audio: "/audio/cafe-ambience.mp3",
    tagline: "Warm. Cozy. Romantic.",
    perfumes: [
      { name: "Vanilla Noir", notes: "Vanilla • Coffee • Patchouli" },
      { name: "Spice Affair", notes: "Cinnamon • Clove • Tonka" },
    ],
    backgroundEffect: "steam",
  },
];



const MoodExplorer: React.FC = () => {
  const [selected, setSelected] = useState<Mood | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selected) {
      audioRef.current = new Audio(selected.audio);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
      if (isPlaying) audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, [selected]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play(); else audioRef.current.pause();
  }, [isPlaying]);

  const renderEffect = (kind: Mood["backgroundEffect"]) => {
    switch (kind) {
      case "waves":
        return (
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ backgroundImage: "url('/patterns/waves.png')", backgroundSize: "cover" }}
          />
        );
      case "petals":
        return (
          <motion.div className="absolute inset-0 pointer-events-none" animate={{ y: [0, 25, 0] }} transition={{ duration: 7, repeat: Infinity }}>
            <div className="absolute w-24 h-24 bg-pink-200/40 rounded-full blur-3xl top-8 left-8"/>
            <div className="absolute w-16 h-16 bg-pink-300/40 rounded-full blur-2xl bottom-8 right-1/4"/>
          </motion.div>
        );
      case "steam":
        return (
          <motion.div className="absolute inset-0 pointer-events-none flex justify-center" initial={{opacity:0.3}} animate={{ y: [40,-40], opacity: [0.3,0.6,0.3] }} transition={{ duration: 6, repeat: Infinity }}>
            <div className="w-32 h-48 bg-zinc-200/30 rounded-full blur-3xl"/>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="moods" className="py-16">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Explore by Mood</h2>
          <p className="text-sm text-zinc-600">Choose a vibe to see curated picks</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moods.map((m, i) => (
            <motion.button key={i} whileHover={{ scale: 1.03 }} className="relative h-64 overflow-hidden rounded-2xl border text-left" onClick={() => { setSelected(m); setIsPlaying(true); }}>
              <video src={m.video} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
              <div className="absolute inset-0 bg-black/35"/>
              <div className="relative z-10 p-5 text-white">
                <h3 className="text-2xl font-semibold drop-shadow">{m.name}</h3>
                <p className="text-sm opacity-90 mt-1">{m.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs bg-white/15 rounded-full px-3 py-1 backdrop-blur">
                  <Play size={14}/> Tap to experience
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
            <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl overflow-hidden">
              {renderEffect(selected.backgroundEffect)}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{selected.name} Mood Picks</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause size={16}/> : <Play size={16}/>} Sound
                    </Button>
                    <button className="text-zinc-500 hover:text-zinc-800" onClick={() => setSelected(null)}>✕</button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {selected.perfumes.map((pf, idx) => (
                    <div key={idx} className="rounded-xl border bg-white/80 backdrop-blur p-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{pf.name}</div>
                        <div className="text-sm text-zinc-600">{pf.notes}</div>
                      </div>
                      <Button className="inline-flex items-center gap-2">Try Now <ChevronRight size={16}/></Button>
                    </div>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default MoodExplorer
