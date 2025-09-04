
"use client";
// import React, { useState, useEffect, useRef } from "react";
import React from "react";
import { motion } from "framer-motion";
// import {  Star,  Sparkles, Play, Pause, ChevronRight, SprayCan } from "lucide-react";




// ---------- Utility Components ----------
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide ${className}`}>{children}</span>
);


// const Button: React.FC<React.PropsWithChildren<{ onClick?: () => void; variant?: "primary" | "ghost" | "outline"; className?: string; as?: "button" | "a"; href?: string }> > = ({
//   children,
//   onClick,
//   variant = "primary",
//   className = "",
//   as = "button",
//   href,
// }) => {
//   const base = "rounded-2xl px-5 py-3 text-sm font-semibold transition shadow-sm";
//   const styles =
//     variant === "primary"
//       ? "bg-black text-white hover:bg-zinc-800"
//       : variant === "outline"
//       ? "border border-black text-black hover:bg-black hover:text-white"
//       : "text-black/80 hover:text-black";
//   if (as === "a" && href) {
//     return (
//       <a href={href} className={`${base} ${styles} ${className}`}>{children}</a>
//     );
//   }
//   return (
//     <button onClick={onClick} className={`${base} ${styles} ${className}`}>{children}</button>
//   );
// };


// ---------- Hero with Cinematic Video ----------
const Hero: React.FC = () => (
  
  <section className="relative h-[86vh] w-full overflow-hidden">
    <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
      <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
    </video>
    
    <div className="absolute inset-0 bg-black/30" />
    <Container className="relative z-10 h-full flex flex-col justify-center text-white">
      <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}} className="max-w-2xl text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow">
        One spray, instant confidence.
      </motion.h1>
      <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.9, delay:0.1}} className="mt-4 max-w-xl text-lg md:text-xl text-white/90">
        Carry freshness & confidence with style
      </motion.p>
    
      <div className="mt-6 flex items-center gap-3 text-sm">
        <Badge className="bg-grey">Long Lasting</Badge>
        <Badge className="bg-black">Oil Based</Badge>
        <Badge className="bg-grey">Pocket Friendly</Badge>
      </div>
    </Container>
  </section>
);




export default Hero
