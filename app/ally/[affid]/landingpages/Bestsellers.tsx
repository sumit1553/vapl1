
"use client";
import React from "react";
import { motion } from "framer-motion";
// import {  Star,  Sparkles, Play, Pause, ChevronRight, SprayCan } from "lucide-react";
// import ProductCard from "./ProductCard";




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


// ---------- Data ----------
const products = [
  { id: 1, name: "Vanilla Noir", dupeOf: "Gourmand Vanilla", price: 1799, image: "/images/products/vanilla-noir.jpg", notes: "Vanilla • Coffee • Patchouli", rating: 4.7 },
  { id: 2, name: "Citrus Wake", dupeOf: "Citrus Fresh", price: 1699, image: "/images/products/citrus-wake.jpg", notes: "Bergamot • Grapefruit • Musk", rating: 4.6 },
  { id: 3, name: "Floral Serenade", dupeOf: "Rose Essence", price: 1899, image: "/images/products/floral-serenade.jpg", notes: "Rose • Jasmine • Sandalwood", rating: 4.8 },
  { id: 4, name: "Ocean Drift", dupeOf: "Marine Breeze", price: 1699, image: "/images/products/ocean-drift.jpg", notes: "Marine • Sea Salt • Amber", rating: 4.5 },
];



// ---------- Bestsellers ----------
const Bestsellers: React.FC = () => (
  <section id="bestsellers" className="py-16 bg-zinc-50">
    <Container>
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Bestsellers</h2>
        <a href="#" className="text-sm underline underline-offset-4">View all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <motion.div key={p.id} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}}>
            {/* <ProductCard p={p} /> */}
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);




export default Bestsellers
