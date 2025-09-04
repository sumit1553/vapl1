'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// import { Button } from '@/components/ui/button';

type Particle = {
  id: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  driftX: number;
  driftY: number;
  size: number;
  opacity: number;
  color: string;
  blur: number;
  isShimmer: boolean;
};


// ---------- Utility Components ----------
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function LuxuryPerfumeSprayWithBottle() {
  
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showHaze, setShowHaze] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible); // Toggle the state
  };

  const handleSpray = () => {
    const bottleX = window.innerWidth / 2;
    const bottleY = window.innerHeight - 160; // nozzle height
    // const bottleY = window.innerHeight/2; // nozzle height

    window.scrollTo({
        top: 700, // Scroll down 500 pixels from the top of the page
        behavior: 'smooth',
      });


    setShowHaze(true);
    setTimeout(() => setShowHaze(false), 5000);

    setTimeout(() => {
      toggleImageVisibility();
      setIsPlaying(true);
    }, 3000);


    

    

    const burst: Particle[] = Array.from({ length: 35 }).map((_, i) => {
      const angle = (Math.random() - 0.5) * 34;
      const distance = 150 + Math.random() * 200;
      const rad = (angle * Math.PI) / 180;

      const endX = bottleX + Math.cos(rad) * distance;
      const endY = bottleY - Math.sin(rad) * distance;

      const curveLift = 50 + Math.random() * 50;
      const midX = (bottleX + endX) / 2 + (Math.random() - 0.5) * 40;
      const midY = ((bottleY + endY) / 2) - curveLift;

      const driftX = endX + (Math.random() - 0.5) * 60;
      const driftY = endY - (Math.random() * 20 + 10);

      const isShimmer = Math.random() < 0.3;
      const size = isShimmer ? 2 + Math.random() * 3 : 5 + Math.random() * 12;
      const opacity = isShimmer
        ? 0.8 + Math.random() * 0.2
        : 0.4 + Math.random() * 0.3;
      const color = isShimmer
        ? 'radial-gradient(circle, rgba(255,223,150,0.9) 0%, rgba(255,223,150,0) 70%)'
        : 'radial-gradient(circle, rgba(255,192,203,0.85) 0%, rgba(255,192,203,0) 70%)';
      const blur = isShimmer ? 0 : 0.5 + Math.random() * 1.5;

      return {
        id: Date.now() + i,
        startX: bottleX,
        startY: bottleY,
        midX,
        midY,
        endX,
        endY,
        driftX,
        driftY,
        size,
        opacity,
        color,
        blur,
        isShimmer,
      };
    });

    setParticles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setParticles((prev) => prev.slice(burst.length));
    }, 4500);
  };

  return (
<Container className="py-10 justify-center ">
    <div
      style={{
        position: 'relative',
        height: '100dvh',
        background: '#171515ff',
        // overflow: 'hidden',
        
      }}
    >
      {/* Haze */}

      {isPlaying && (
      <video className="absolute py-10  h-full w-full object-cover"  autoPlay muted  playsInline>
          <source src="/videos/testintro.mp4" type="video/mp4" />
        </video>
      )}

      <AnimatePresence>
        {showHaze && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'radial-gradient(circle, rgba(255, 228, 235, 0.55) 0%, rgba(255, 240, 245, 0.25) 100%)',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'none',
              zIndex: 35,
            }}
          />

          



        )}

      </AnimatePresence>

      {/* Button */}
      {/* <Button
        onClick={handleSpray}
        style={{
          // position: 'fixed',
          bottom: 16,
          position:'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 18px',
          background: '#3342e7ff',
          color: 'white',
          fontWeight: 700,
          borderRadius: 9999,
          border: 'none',
          boxShadow: '0 8px 16px rgba(236,72,153,.35)',
          cursor: 'pointer',
          zIndex: 50,
        }}
      >
        Spray Perfume
      </Button> */}

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.startX,
            y: p.startY,
            opacity: p.isShimmer ? 0 : p.opacity,
            scale: 1,
          }}
          animate={{
            x: [p.startX, p.midX, p.endX, p.driftX],
            y: [p.startY, p.midY, p.endY, p.driftY],
            opacity: [p.isShimmer ? 0 : p.opacity, p.opacity, 0],
            scale: 0.3,
          }}
          transition={{
            duration: p.isShimmer ? 4.5 : 4,
            ease: 'easeOut',
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: p.size,
            height: p.size,
            borderRadius: 9999,
            pointerEvents: 'none',
            background: p.color,
            filter: `blur(${p.blur}px)`,
            zIndex: p.isShimmer ? 45 : 40,
          }}
        />
      ))}

      {/* Perfume Bottle */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
        }}
      >
        {/* <img
          src="/perfume-bottle.png"
          alt="Perfume Bottle"
          style={{ width: 120, height: 'auto' }}
        /> */}

        {isImageVisible && ( // Conditionally render the image based on the state
        // <Button
        // onClick={handleSpray}
        // style={{opacity:5}}>
        <Image
          onClick={handleSpray}
          src="/perfume-bottle.png" // Path to your image in the public directory
          alt="Perfume Bottle"
          width={120} // Set appropriate width
          height={400} // Set appropriate height
        />
        // </Button>
      )}


      
        

      




      </div>
    </div>
    </Container>
  );
}
