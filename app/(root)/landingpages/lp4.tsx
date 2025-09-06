
"use client";
// import React, { useState, useEffect, useRef } from "react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { ShoppingCart, Star, Droplets, Sparkles, Play, Pause, ChevronRight, SprayCan } from "lucide-react";
// import {  Star,  Sparkles, Play, Pause, ChevronRight, SprayCan } from "lucide-react";
import {  Star } from "lucide-react";

// import Image from 'next/image';
// import Link from "next/link";
// import ModeToggle from "@/components/shared/header/mode-toggle";
// import Header2 from "@/components/header2";
// import LuxuryPerfumeSprayWithBottle from "./sprayperfume5";
// import UserButton from "@/components/shared/header/user-button";

/**
 * Dossier-style perfume storefront in a single TSX file.
 * - Hero with cinematic background video
 * - Bestsellers grid
 * - Mood-driven exploration (video cards + modal with ambient sound)
 * - Discovery set builder CTA
 * - Brand philosophy / sustainability
 * - Reviews carousel
 * - Sticky nav + footer
 *
 * Drop in /app/page.tsx (Next.js App Router) or pages/index.tsx (Pages Router).
 * Requires Tailwind CSS & Framer Motion. Uses only native elements (no external UI kit).
 *
 * ASSETS to add under /public:
 *  /videos/hero-cinematic.mp4
 *  /videos/mood-beach.mp4, /videos/mood-garden.mp4, /videos/mood-cafe.mp4
 *  /audio/beach-waves.mp3, /audio/garden-birds.mp3, /audio/cafe-ambience.mp3
 *  /images/products/*.jpg (placeholders in data below)
 *  /patterns/waves.png (optional for beach modal animation)
 */

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
// const products = [
//   { id: 1, name: "Vanilla Noir", dupeOf: "Gourmand Vanilla", price: 1799, image: "/images/products/vanilla-noir.jpg", notes: "Vanilla • Coffee • Patchouli", rating: 4.7 },
//   { id: 2, name: "Citrus Wake", dupeOf: "Citrus Fresh", price: 1699, image: "/images/products/citrus-wake.jpg", notes: "Bergamot • Grapefruit • Musk", rating: 4.6 },
//   { id: 3, name: "Floral Serenade", dupeOf: "Rose Essence", price: 1899, image: "/images/products/floral-serenade.jpg", notes: "Rose • Jasmine • Sandalwood", rating: 4.8 },
//   { id: 4, name: "Ocean Drift", dupeOf: "Marine Breeze", price: 1699, image: "/images/products/ocean-drift.jpg", notes: "Marine • Sea Salt • Amber", rating: 4.5 },
// ];

// const products = [
//   { id: 1, name: "Vanilla Noir", dupeOf: "Gourmand Vanilla", price: 1799, image: "/images/products/pro1.png", notes: "Vanilla • Coffee • Patchouli", rating: 4.7 },
//   { id: 2, name: "Citrus Wake", dupeOf: "Citrus Fresh", price: 1699, image: "/images/products/pro2.png", notes: "Bergamot • Grapefruit • Musk", rating: 4.6 },
//   { id: 3, name: "Floral Serenade", dupeOf: "Rose Essence", price: 1899, image: "/images/products/pro3.png", notes: "Rose • Jasmine • Sandalwood", rating: 4.8 },
//   { id: 4, name: "Ocean Drift", dupeOf: "Marine Breeze", price: 1699, image: "/images/products/pro4.png", notes: "Marine • Sea Salt • Amber", rating: 4.5 },
// ];

// ---------- Navbar ----------
// const Nav: React.FC = () => (

  // <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b">
  //   <Container className="flex h-16 items-center justify-between">
      
  //     {/* <a href="#" className="text-xl font-bold tracking-tight">QV</a> */}
  //      <Link href='/' className='flex-start ml-4'>
  //           <Image
  //             src='/images/logo.svg'
  //             alt='qvlogo'
  //             height={48}
  //             width={48}
  //             priority={true}
  //           />
  //           {/* <span className='hidden lg:block font-bold text-2xl ml-3'>
  //             QV
  //           </span> */}
  //         </Link>

  //     <nav className="hidden md:flex items-center gap-6 text-sm">
  //       <a href="#bestsellers" className="hover:opacity-70">Bestsellers</a>
  //       <a href="#moods" className="hover:opacity-70">Explore</a>
  //       <a href="#discovery" className="hover:opacity-70">Discovery Set</a>
  //       <a href="#values" className="hover:opacity-70">Our Values</a>
  //       <a href="#reviews" className="hover:opacity-70">Reviews</a>
  //     </nav>
  //     <div className="flex items-center gap-3">
  //       {/* <ModeToggle /> */}
  //       <Button variant="outline" className="hidden sm:inline-flex">Sign In</Button>
  //       <Button className="inline-flex items-center gap-2"><ShoppingCart size={18}/> Cart</Button>
  //       {/* <UserButton /> */}
  //     </div>
  //   </Container>
  // </header>
  
// );



// ---------- Hero with Cinematic Video ----------
// const Hero: React.FC = () => (
  
//   <section className="relative h-[86vh] w-full overflow-hidden">
//     <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
//       <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
//     </video>
    
//     <div className="absolute inset-0 bg-black/30" />
//     <Container className="relative z-10 h-full flex flex-col justify-center text-white">
//       <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}} className="max-w-2xl text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow">
//         One spray, instant confidence.
//       </motion.h1>
//       <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.9, delay:0.1}} className="mt-4 max-w-xl text-lg md:text-xl text-white/90">
//         Carry freshness & confidence with style
//       </motion.p>
      

//       <div className="mt-6 flex items-center gap-3 text-sm">
//         <Badge className="bg-grey">Long Lasting</Badge>
//         <Badge className="bg-black">Oil Based</Badge>
//         <Badge className="bg-grey">Pocket Friendly</Badge>
//       </div>
//     </Container>
//   </section>
// );


// ---------- Intro Video ----------
// const Introvideo: React.FC = () => (
  
//   <section id="introvideo" className="py-10 relative h-[86vh] w-full overflow-hidden">
//     <Container>
//       <div className="flex items-end justify-between mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold">Intro Video</h2>
        
//       </div>
//       <div>
//         <video className="absolute  h-full w-full object-cover"  autoPlay muted  playsInline>
//           <source src="/videos/testintro.mp4" type="video/mp4" />
//         </video>

//       </div>  
//     </Container>
//   </section>
// );




// ---------- Navigation  ----------
// const Navigator: React.FC = () => (
//   // className="relative h-[86vh] w-full overflow-hidden"
//   <section id="navigator" className="py-10 relative h-[86vh] w-full overflow-hidden">
//     <Container>
//       <div className="flex items-end justify-between mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold">Navigation</h2>
//         {/* <a href="#" className="text-sm underline underline-offset-4">View all</a> */}
//       </div>

//       <div>
//         <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:1, delay:0.2}} className="mt-8 flex flex-wrap items-center gap-3">
//         <Button as="a" href="#bestsellers">Shop Bestsellers</Button>
//         <Button as="a" href="#moods"  className="backdrop-blur bg-grey/10 border-white text-white">Explore by Mood</Button>
//          <Button as="a" href="#discovery"  className="backdrop-blur bg-grey/10 border-white text-white">Build Discovery Set</Button>
//       </motion.div>
        

//       </div>


       
//     </Container>

    
//   </section>
// );




// ---------- Product Card ----------
// const ProductCard: React.FC<{p: typeof products[number]}> = ({ p }) => (
//   <div className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
//     <div className="relative aspect-[4/5] overflow-hidden">

//       <Image src={p.image} alt={p.name}  height='100' width='100' className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>

//       <div className="absolute left-3 top-3">
//         <Badge className="bg-white/90">Inspired by</Badge>
//       </div>
//     </div>
//     <div className="p-4">
//       <div className="flex items-start justify-between gap-2">
//         <div>
//           <h3 className="text-base font-semibold">{p.name}</h3>
//           <p className="text-xs text-zinc-500">{p.dupeOf}</p>
//         </div>
//         <div className="flex items-center gap-1 text-amber-500 text-sm">
//           <Star size={16} fill="currentColor" className="-mt-px"/>
//           <span>{p.rating}</span>
//         </div>
//       </div>
//       <p className="mt-2 text-sm text-zinc-600">{p.notes}</p>
//       <div className="mt-4 flex items-center justify-between">
//         <span className="text-lg font-bold">₹{p.price}</span>
//         {/* <Button className="inline-flex items-center gap-2"><Droplets size={16}/> Add</Button> */}
//         <Button className="inline-flex items-center gap-2"><SprayCan size={16}/> Add</Button>
//       </div>
//     </div>
//   </div>
// );



// ---------- Bestsellers ----------
// const Bestsellers: React.FC = () => (
//   <section id="bestsellers" className="py-16 bg-zinc-50">
//     <Container>
//       <div className="flex items-end justify-between mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold">Bestsellers</h2>
//         <a href="#" className="text-sm underline underline-offset-4">View all</a>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((p) => (
//           <motion.div key={p.id} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}}>
//             <ProductCard p={p} />
//           </motion.div>
//         ))}
//       </div>
//     </Container>
//   </section>
// );

// ---------- Mood Explorer (video cards + modal + audio) ----------

// type Mood = {
//   name: string;
//   video: string;
//   audio: string;
//   tagline: string;
//   perfumes: { name: string; notes: string }[];
//   backgroundEffect: "waves" | "petals" | "steam";
// };

// const moods: Mood[] = [
//   {
//     name: "Beach",
//     video: "/videos/mood-beach.mp4",
//     audio: "/audio/beach-waves.mp3",
//     tagline: "Fresh. Breezy. Ocean Escape.",
//     perfumes: [
//       { name: "Azure Mist", notes: "Citrus • Sea Salt • Musk" },
//       { name: "Ocean Drift", notes: "Bergamot • Marine • Amber" },
//     ],
//     backgroundEffect: "waves",
//   },
//   {
//     name: "Garden",
//     video: "/videos/mood-garden.mp4",
//     audio: "/audio/garden-birds.mp3",
//     tagline: "Bloom with Nature.",
//     perfumes: [
//       { name: "Floral Serenade", notes: "Rose • Jasmine • Sandalwood" },
//       { name: "Green Whisper", notes: "Herbs • Lily • Vetiver" },
//     ],
//     backgroundEffect: "petals",
//   },
//   {
//     name: "Café",
//     video: "/videos/mood-cafe.mp4",
//     audio: "/audio/cafe-ambience.mp3",
//     tagline: "Warm. Cozy. Romantic.",
//     perfumes: [
//       { name: "Vanilla Noir", notes: "Vanilla • Coffee • Patchouli" },
//       { name: "Spice Affair", notes: "Cinnamon • Clove • Tonka" },
//     ],
//     backgroundEffect: "steam",
//   },
// ];


// const MoodExplorer: React.FC = () => {
//   const [selected, setSelected] = useState<Mood | null>(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     if (selected) {
//       audioRef.current = new Audio(selected.audio);
//       audioRef.current.loop = true;
//       audioRef.current.volume = 0.45;
//       if (isPlaying) audioRef.current.play().catch(() => {});
//     }
//     return () => {
//       if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
//     };
//   }, [selected]);

//   useEffect(() => {
//     if (!audioRef.current) return;
//     if (isPlaying) audioRef.current.play(); else audioRef.current.pause();
//   }, [isPlaying]);

//   const renderEffect = (kind: Mood["backgroundEffect"]) => {
//     switch (kind) {
//       case "waves":
//         return (
//           <motion.div
//             className="absolute inset-0 opacity-40"
//             animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//             style={{ backgroundImage: "url('/patterns/waves.png')", backgroundSize: "cover" }}
//           />
//         );
//       case "petals":
//         return (
//           <motion.div className="absolute inset-0 pointer-events-none" animate={{ y: [0, 25, 0] }} transition={{ duration: 7, repeat: Infinity }}>
//             <div className="absolute w-24 h-24 bg-pink-200/40 rounded-full blur-3xl top-8 left-8"/>
//             <div className="absolute w-16 h-16 bg-pink-300/40 rounded-full blur-2xl bottom-8 right-1/4"/>
//           </motion.div>
//         );
//       case "steam":
//         return (
//           <motion.div className="absolute inset-0 pointer-events-none flex justify-center" initial={{opacity:0.3}} animate={{ y: [40,-40], opacity: [0.3,0.6,0.3] }} transition={{ duration: 6, repeat: Infinity }}>
//             <div className="w-32 h-48 bg-zinc-200/30 rounded-full blur-3xl"/>
//           </motion.div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <section id="moods" className="py-16">
//       <Container>
//         <div className="flex items-end justify-between mb-8">
//           <h2 className="text-3xl md:text-4xl font-bold">Explore by Mood</h2>
//           <p className="text-sm text-zinc-600">Choose a vibe to see curated picks</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {moods.map((m, i) => (
//             <motion.button key={i} whileHover={{ scale: 1.03 }} className="relative h-64 overflow-hidden rounded-2xl border text-left" onClick={() => { setSelected(m); setIsPlaying(true); }}>
//               <video src={m.video} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
//               <div className="absolute inset-0 bg-black/35"/>
//               <div className="relative z-10 p-5 text-white">
//                 <h3 className="text-2xl font-semibold drop-shadow">{m.name}</h3>
//                 <p className="text-sm opacity-90 mt-1">{m.tagline}</p>
//                 <div className="mt-4 inline-flex items-center gap-2 text-xs bg-white/15 rounded-full px-3 py-1 backdrop-blur">
//                   <Play size={14}/> Tap to experience
//                 </div>
//               </div>
//             </motion.button>
//           ))}
//         </div>

//         {/* Modal */}
//         {selected && (
//           <div className="fixed inset-0 z-50 grid place-items-center p-4">
//             <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
//             <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl overflow-hidden">
//               {renderEffect(selected.backgroundEffect)}
//               <div className="relative z-10">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-2xl font-bold">{selected.name} Mood Picks</h3>
//                   <div className="flex items-center gap-2">
//                     <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsPlaying(!isPlaying)}>
//                       {isPlaying ? <Pause size={16}/> : <Play size={16}/>} Sound
//                     </Button>
//                     <button className="text-zinc-500 hover:text-zinc-800" onClick={() => setSelected(null)}>✕</button>
//                   </div>
//                 </div>
//                 <div className="mt-4 grid grid-cols-1 gap-3">
//                   {selected.perfumes.map((pf, idx) => (
//                     <div key={idx} className="rounded-xl border bg-white/80 backdrop-blur p-4 flex items-center justify-between">
//                       <div>
//                         <div className="font-semibold">{pf.name}</div>
//                         <div className="text-sm text-zinc-600">{pf.notes}</div>
//                       </div>
//                       <Button className="inline-flex items-center gap-2">Try Now <ChevronRight size={16}/></Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Container>
//     </section>
//   );
// };

// ---------- Discovery Set CTA ----------

// const DiscoverySet: React.FC = () => (
//   <section id="discovery" className="py-16 bg-gradient-to-b from-zinc-50 to-white">
//     <Container>
//       <div className="grid lg:grid-cols-2 gap-10 items-center">
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold">Build your Discovery Set</h2>
//           <p className="mt-3 text-zinc-600">Pick any 3–5 minis. Try at home. Get credits back when you buy full‑size.</p>
//           <ul className="mt-6 space-y-2 text-sm">
//             <li className="flex items-center gap-2"><Sparkles size={16}/> Personalized picks</li>
//             <li className="flex items-center gap-2"><Sparkles size={16}/> Free returns & exchanges</li>
//             <li className="flex items-center gap-2"><Sparkles size={16}/> Ships in 24–48 hrs</li>
//           </ul>
//           <div className="mt-6 flex gap-3">
//             <Button>Start Building</Button>
//             <Button variant="outline">How it works</Button>
//           </div>
//         </div>
//         <div className="rounded-2xl border p-4 bg-white shadow-sm">
//           <div className="grid grid-cols-3 gap-3">
//             {products.slice(0,3).map(p => (
//               <div key={p.id} className="aspect-[3/4] rounded-xl overflow-hidden border">
//                 {/* <img src={p.image} alt={p.name} className="h-full w-full object-cover"/> */}
//                 <Image src={p.image} alt={p.name} width='100' height='100' className="h-full w-full object-cover"/>
//               </div>
//             ))}
//             <div className="col-span-3 text-center text-sm text-zinc-600 pt-2">Add 2–5 minis to your set</div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   </section>
// );

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

// ---------- Footer ----------
const Footer: React.FC = () => (
  <footer className="border-t py-10 bg-white">
    <Container className="grid md:grid-cols-4 gap-8 text-sm">
      <div>
        <div className="text-xl font-bold">VAPL</div>
        {/* <p className="mt-2 text-zinc-600">Carry your confidence, wherever you go, Instant confidence & freshness in your pocket; Crafted to make you feel incredible.</p> */}
      </div>
      <div>
        <div className="font-semibold mb-2">Shop</div>
        <ul className="space-y-1 text-zinc-600">
          <li><a href="#bestsellers" className="hover:underline">Bestsellers</a></li>
          {/* <li><a href="#moods" className="hover:underline">Explore by Mood</a></li> */}
          {/* <li><a href="#discovery" className="hover:underline">Discovery Set</a></li> */}
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
      
      {/* <div>
        <div className="font-semibold mb-2">Newsletter</div>
        <div className="flex gap-2">
          <input placeholder="Email address" className="w-full rounded-xl border px-3 py-2"/>
          <Button>Join</Button>
        </div>
      </div> */}
    </Container>
  </footer>
);

// ---------- Page ----------
export default function DossierStyleSite() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* <Nav /> */}
      {/* <Hero /> */}
      {/* <LuxuryPerfumeSprayWithBottle /> */}
      {/* <Introvideo /> */}

      {/* <Navigator /> */}
      {/* <Bestsellers /> */}
      {/* <MoodExplorer /> */}
      {/* <DiscoverySet /> */}
      {/* <Values /> */}
      {/* <Reviews /> */}
      <Footer />
    </main>
  );
}
