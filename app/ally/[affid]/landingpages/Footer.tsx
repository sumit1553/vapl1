
"use client";
import React from "react";
// import { motion } from "framer-motion";
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



// ---------- Footer ----------
const Footer: React.FC = () => (
  <footer className="border-t py-10 bg-white">
    <Container className="grid md:grid-cols-4 gap-8 text-sm">
      <div>
        <div className="text-xl font-bold">QV Perfumes</div>
        <p className="mt-2 text-zinc-600">Carry your confidence, wherever you go, Instant confidence & freshness in your pocket; Crafted to make you feel incredible.</p>
      </div>
      <div>
        <div className="font-semibold mb-2">Shop</div>
        <ul className="space-y-1 text-zinc-600">
          <li><a href="#bestsellers" className="hover:underline">Bestsellers</a></li>
          <li><a href="#moods" className="hover:underline">Explore by Mood</a></li>
          <li><a href="#discovery" className="hover:underline">Discovery Set</a></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">Help</div>
        <ul className="space-y-1 text-zinc-600">
          <li>Shipping & Returns</li>
          <li>FAQs</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">Newsletter</div>
        <div className="flex gap-2">
          <input placeholder="Email address" className="w-full rounded-xl border px-3 py-2"/>
          <Button>Join</Button>
        </div>
      </div>
    </Container>
  </footer>
);




export default Footer
