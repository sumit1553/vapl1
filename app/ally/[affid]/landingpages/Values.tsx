
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




// ---------- Values / Sustainability ----------
const Values: React.FC = () => (
  <section id="values" className="py-16">
    <Container>
      <div className="grid md:grid-cols-3 gap-6">
        {[{
          title: "Clean & Conscious",
          desc: "IFRA-compliant formulas. No parabens, phthalates or dyes.",
        },{
          title: "Cruelty‑free & Vegan",
          desc: "Never tested on animals. 100% vegan ingredients.",
        },{
          title: "Transparent Pricing",
          desc: "Luxury quality without the luxury markup.",
        }].map((f, i) => (
          <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}}
            className="rounded-2xl border p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-zinc-600 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);




export default Values
