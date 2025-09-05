"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // animate while section enters/exits
  });

  // Moves image up by -100px to +100px as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
