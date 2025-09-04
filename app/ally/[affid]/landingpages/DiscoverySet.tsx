
"use client";
import React from "react";
// import { motion } from "framer-motion";
import {  Sparkles } from "lucide-react";
import Image from "next/image";




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



// ---------- Data ----------
const products = [
  { id: 1, name: "Vanilla Noir", dupeOf: "Gourmand Vanilla", price: 1799, image: "/images/products/vanilla-noir.jpg", notes: "Vanilla • Coffee • Patchouli", rating: 4.7 },
  { id: 2, name: "Citrus Wake", dupeOf: "Citrus Fresh", price: 1699, image: "/images/products/citrus-wake.jpg", notes: "Bergamot • Grapefruit • Musk", rating: 4.6 },
  { id: 3, name: "Floral Serenade", dupeOf: "Rose Essence", price: 1899, image: "/images/products/floral-serenade.jpg", notes: "Rose • Jasmine • Sandalwood", rating: 4.8 },
  { id: 4, name: "Ocean Drift", dupeOf: "Marine Breeze", price: 1699, image: "/images/products/ocean-drift.jpg", notes: "Marine • Sea Salt • Amber", rating: 4.5 },
];



// ---------- Discovery Set CTA ----------
const DiscoverySet: React.FC = () => (
  <section id="discovery" className="py-16 bg-gradient-to-b from-zinc-50 to-white">
    <Container>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Build your Discovery Set</h2>
          <p className="mt-3 text-zinc-600">Pick any 3–5 minis. Try at home. Get credits back when you buy full‑size.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Sparkles size={16}/> Personalized picks</li>
            <li className="flex items-center gap-2"><Sparkles size={16}/> Free returns & exchanges</li>
            <li className="flex items-center gap-2"><Sparkles size={16}/> Ships in 24–48 hrs</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Button>Start Building</Button>
            <Button variant="outline">How it works</Button>
          </div>
        </div>
        <div className="rounded-2xl border p-4 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-3">
            {products.slice(0,3).map(p => (
              <div key={p.id} className="aspect-[3/4] rounded-xl overflow-hidden border">
                {/* <img src={p.image} alt={p.name} className="h-full w-full object-cover"/> */}
                <Image src={p.image} alt={p.name} width='100' height='100' className="h-full w-full object-cover"/>
              </div>
            ))}
            <div className="col-span-3 text-center text-sm text-zinc-600 pt-2">Add 2–5 minis to your set</div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);



export default DiscoverySet
