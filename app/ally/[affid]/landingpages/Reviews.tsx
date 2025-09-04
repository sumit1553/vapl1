
"use client";
// import React, { useState, useEffect, useRef } from "react";
import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {  Star,  Sparkles, Play, Pause, ChevronRight, SprayCan } from "lucide-react";
import {  Star } from "lucide-react";




// ---------- Utility Components ----------
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
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


// ---------- Reviews (simple auto-play carousel) ----------
const reviews = [
  { name: "Aisha", text: "Smells just like my favorite designer scent, but lighter & cleaner.", rating: 5 },
  { name: "Rohan", text: "The discovery set helped me lock my signature. Huge fan!", rating: 5 },
  { name: "Meera", text: "Great longevity for the price. Compliments every time.", rating: 4 },
];

const Reviews: React.FC = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i+1) % reviews.length), 3500);
    return () => clearInterval(t);
  }, []);
  const r = reviews[idx];
  return (
    <section id="reviews" className="py-16 bg-zinc-50">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center">Loved by scent lovers</h2>
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border bg-white p-6 text-center shadow-sm">
          <div className="flex justify-center gap-1 text-amber-500 mb-2">
            {Array.from({length:r.rating}).map((_,i)=>(<Star key={i} size={18} fill="currentColor"/>))}
          </div>
          <p className="text-lg">“{r.text}”</p>
          <p className="mt-2 text-sm text-zinc-600">— {r.name}</p>
        </div>
      </Container>
    </section>
  );
};


export default Reviews
