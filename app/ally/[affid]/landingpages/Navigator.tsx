
"use client";
// import React, { useState, useEffect, useRef } from "react";
import React from "react";
import { motion } from "framer-motion";
// import {  Star,  Sparkles, Play, Pause, ChevronRight, SprayCan } from "lucide-react";




// ---------- Utility Components ----------
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
//   <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide ${className}`}>{children}</span>
// );


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



// ---------- Navigation  ----------
const Navigator: React.FC = () => (
  // className="relative h-[86vh] w-full overflow-hidden"
  <section id="navigator" className="py-10 relative h-[86vh] w-full overflow-hidden">
    <Container>
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Navigation</h2>
        {/* <a href="#" className="text-sm underline underline-offset-4">View all</a> */}
      </div>

      <div>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:1, delay:0.2}} className="mt-8 flex flex-wrap items-center gap-3">
        <Button as="a" href="#bestsellers">Shop Bestsellers</Button>
        <Button as="a" href="#moods"  className="backdrop-blur bg-grey/10 border-white text-white">Explore by Mood</Button>
         <Button as="a" href="#discovery"  className="backdrop-blur bg-grey/10 border-white text-white">Build Discovery Set</Button>
      </motion.div>
        

      </div>


       
    </Container>

    
  </section>
);






export default Navigator
