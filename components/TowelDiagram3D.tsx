'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Bed, Waves, Wind, Lock, Hand, Sparkles, Check, Info } from 'lucide-react';

interface HotspotDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  spec: string;
  xPercent: number;
  yPercent: number;
}

const HOTSPOTS: HotspotDetail[] = [
  {
    id: 'pillow',
    title: 'ERGONOMIC PILLOW CONTOUR',
    category: '01 / ERGONOMICS',
    description: 'Custom integrated contour envelope engineered to hold the quick-inflatable chamber at the ideal cervical angle for beach reading.',
    spec: '3-second inflation · Anti-slip sleeve',
    xPercent: 28,
    yPercent: 22,
  },
  {
    id: 'pocket',
    title: 'CONCEALED ZIPPER POCKET',
    category: '04 / SECRECY',
    description: 'Discreet sand-sealed zipper pocket nestled underneath the bottom seam for keeping room keys, lip balm, and phone safely out of view.',
    spec: 'Water-resistant nylon zipper · Hidden gusset',
    xPercent: 74,
    yPercent: 72,
  },
];

export default function TowelDiagram3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const [activeCallout, setActiveCallout] = useState<number | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotDetail | null>(null);
  const [isInspecting, setIsInspecting] = useState(false);

  // Mouse & Touch 3D Tilt Logic
  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const shadow = shadowRef.current;
    if (!stage || !card) return;

    let isHovering = false;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let animationFrameId: number | null = null;

    const updateTilt = () => {
      if (!isHovering) {
        currentRotateX += (0 - currentRotateX) * 0.1;
        currentRotateY += (0 - currentRotateY) * 0.1;
        if (Math.abs(currentRotateX) < 0.05 && Math.abs(currentRotateY) < 0.05) {
          currentRotateX = 0;
          currentRotateY = 0;
          card.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
          if (shadow) shadow.style.transform = `translateX(0px) scale(1)`;
          animationFrameId = null;
          return;
        }
      } else {
        currentRotateX += (targetRotateX - currentRotateX) * 0.15;
        currentRotateY += (targetRotateY - currentRotateY) * 0.15;
      }

      card.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translateZ(24px)`;
      if (shadow) {
        const shadowOffsetX = (-currentRotateY * 1.8).toFixed(1);
        const shadowOffsetY = (currentRotateX * 0.8).toFixed(1);
        const shadowScale = (1 + Math.abs(currentRotateX) * 0.008).toFixed(2);
        shadow.style.transform = `translate(${shadowOffsetX}px, ${shadowOffsetY}px) scale(${shadowScale})`;
      }

      animationFrameId = requestAnimationFrame(updateTilt);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxTilt = 16;

      targetRotateY = ((x - centerX) / centerX) * maxTilt;
      targetRotateX = -((y - centerY) / centerY) * maxTilt;

      if (!isHovering) {
        isHovering = true;
        setIsInspecting(true);
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(updateTilt);
        }
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateTilt);
      }
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCardClick = (index: number) => {
    setActiveCallout(activeCallout === index ? null : index);
    if (index === 1) setSelectedHotspot(HOTSPOTS[0]);
    else if (index === 4) setSelectedHotspot(HOTSPOTS[1]);
    else setSelectedHotspot(null);
  };

  return (
    <section className="py-14 lg:py-24 bg-surface-container-low border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column Callouts */}
          <div className="lg:col-span-3 flex flex-col space-y-8 lg:space-y-12 order-2 lg:order-1">
            {/* Callout 1: Inflatable Pillow */}
            <div
              onClick={() => handleCardClick(1)}
              className={`group relative p-6 bg-surface border transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(29,29,26,0.04)] cursor-pointer ${
                activeCallout === 1
                  ? 'border-primary ring-1 ring-primary/20 scale-[1.02]'
                  : 'border-outline-variant/40 hover:border-primary'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Bed className="text-secondary w-6 h-6 stroke-[1.5]" />
                <span className="font-label-caps-sm text-label-caps-sm text-secondary tracking-widest uppercase">
                  01 / ERGONOMICS
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-medium mb-2">
                Inflatable Pillow
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                A built-in pocket lets you bring your inflatable pillow wherever you go — without carrying an extra one.
              </p>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-caps-sm text-[10px]">
                <span>INTEGRATED CHAMBER</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </div>
            </div>

            {/* Callout 2: Premium Beach Towel */}
            <div
              onClick={() => handleCardClick(2)}
              className={`group relative p-6 bg-surface border transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(29,29,26,0.04)] cursor-pointer ${
                activeCallout === 2
                  ? 'border-primary ring-1 ring-primary/20 scale-[1.02]'
                  : 'border-outline-variant/40 hover:border-primary'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Waves className="text-secondary w-6 h-6 stroke-[1.5]" />
                <span className="font-label-caps-sm text-label-caps-sm text-secondary tracking-widest uppercase">
                  02 / TEXTILE
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-medium mb-2">
                Premium Beach Towel
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Soft, lightweight and quick-drying — made for lying down, sitting, relaxing, or drying off after the ocean.
              </p>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-caps-sm text-[10px]">
                <span>WAFFLE LINEN WEAVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </div>
            </div>
          </div>

          {/* Center Column: Hero Product Image Canvas with Interactive 3D Tilt */}
          <div className="lg:col-span-6 order-1 lg:order-2 text-center relative px-2">
            {/* 3D Perspective Stage */}
            <div
              ref={stageRef}
              id="towel-tilt-stage"
              className="relative inline-block mx-auto max-w-md lg:max-w-lg w-full cursor-grab active:cursor-grabbing select-none"
              style={{ perspective: '1100px' }}
            >
              {/* Tilt Card wrapper */}
              <div
                ref={cardRef}
                id="towel-tilt-card"
                className="relative w-full transition-transform duration-300 ease-out"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {/* Ambient Floating Wrapper */}
                <div className="animate-gentle-float relative flex flex-col items-center">
                  {/* Isolated Floating Towel Image */}
                  <div className="relative z-10 p-2 sm:p-4">
                    <img
                      alt="Isolated studio shot of a luxurious minimalist unfolded sand-beige and ivory beach towel with integrated ergonomic head pillow contour, floating gracefully"
                      className="w-full h-auto max-h-[520px] object-contain mx-auto filter contrast-[1.02] drop-shadow-sm transition-transform duration-300"
                      id="towel-img"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8mbEpHNpkx-T2on4YAjoFokcXSpxAL9_WgUOYIusNB7_DPkE21LT-M4F-ja6d-tnWhi_oi6zgEzVegId2hyynJVXWup_EYEaeUYT2ZrxAt5g5ItK1yfHVPAG4UOjR5iIRuEOCZXaCbR307QcuYEpGdMcN6rQa6vULiWJZfzASed_IGS86hp7r5CJ-ROqtOz03wb920vxO3wzMXJsyB7btNbSfKvTxs0WV4s4Vis6oEtcMLMDHXQuddQ"
                      referrerPolicy="no-referrer"
                    />

                    {/* Interactive Hotspot 1: Pillow */}
                    <div
                      className="absolute top-[22%] left-[28%] group/pin z-20 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHotspot(HOTSPOTS[0]);
                      }}
                    >
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary-container border-2 border-surface shadow-md"></span>
                      </span>
                      <div className="absolute left-6 -top-2 bg-surface px-2.5 py-1 border border-outline-variant/50 text-[10px] font-label-caps-sm tracking-wider whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity shadow-sm pointer-events-none">
                        ERGONOMIC PILLOW CONTOUR
                      </div>
                    </div>

                    {/* Interactive Hotspot 2: Pocket */}
                    <div
                      className="absolute bottom-[28%] right-[26%] group/pin z-20 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHotspot(HOTSPOTS[1]);
                      }}
                    >
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary-container border-2 border-surface shadow-md"></span>
                      </span>
                      <div className="absolute right-6 -top-2 bg-surface px-2.5 py-1 border border-outline-variant/50 text-[10px] font-label-caps-sm tracking-wider whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity shadow-sm pointer-events-none">
                        CONCEALED ZIPPER POCKET
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Ground Contact Shadow (Soft Radial Diffused) */}
                  <div
                    ref={shadowRef}
                    id="towel-dynamic-shadow"
                    className="w-3/4 h-8 bg-black/30 blur-xl rounded-[100%] mx-auto -mt-6 animate-shadow-pulse pointer-events-none transition-all duration-300"
                  ></div>
                </div>
              </div>

              {/* Interactive Hint & Spec Label */}
              <div className="mt-6 flex items-center justify-between text-on-surface-variant font-label-caps-sm text-xs px-4 tracking-widest text-outline">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  SPEC. NO. 01 — BALI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] opacity-75">
                  <Hand className="w-3.5 h-3.5" />
                  MOVE CURSOR TO INSPECT
                </span>
                <span className="text-right">AEROLIGHT EDITION</span>
              </div>
            </div>

            {/* Hotspot Drawer / Card if selected */}
            {selectedHotspot && (
              <div className="mt-6 max-w-md mx-auto p-4 bg-surface border border-outline-variant/60 shadow-lg text-left animate-in fade-in duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-caps-sm text-[10px] text-secondary tracking-widest block mb-1">
                      {selectedHotspot.category}
                    </span>
                    <h4 className="font-headline-sm text-base text-primary font-medium">
                      {selectedHotspot.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="text-on-surface-variant hover:text-primary text-xs font-label-caps-sm px-2 py-1 border border-outline-variant/30"
                  >
                    CLOSE
                  </button>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  {selectedHotspot.description}
                </p>
                <div className="mt-3 pt-2 border-t border-outline-variant/30 flex items-center gap-2 text-[11px] font-body-sm text-primary">
                  <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>{selectedHotspot.spec}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column Callouts */}
          <div className="lg:col-span-3 flex flex-col space-y-8 lg:space-y-12 order-3">
            {/* Callout 3: Easy Inflate & Deflate */}
            <div
              onClick={() => handleCardClick(3)}
              className={`group relative p-6 bg-surface border transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(29,29,26,0.04)] cursor-pointer ${
                activeCallout === 3
                  ? 'border-primary ring-1 ring-primary/20 scale-[1.02]'
                  : 'border-outline-variant/40 hover:border-primary'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Wind className="text-secondary w-6 h-6 stroke-[1.5]" />
                <span className="font-label-caps-sm text-label-caps-sm text-secondary tracking-widest uppercase">
                  03 / FUNCTION
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-medium mb-2">
                Easy Inflate &amp; Deflate
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Inflate when you need it. Deflate when you&apos;re done. Simple comfort, wherever you wander along the coastline.
              </p>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-caps-sm text-[10px]">
                <span>FAST AIR-VALVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </div>
            </div>

            {/* Callout 4: Hidden Zipper Pocket */}
            <div
              onClick={() => handleCardClick(4)}
              className={`group relative p-6 bg-surface border transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(29,29,26,0.04)] cursor-pointer ${
                activeCallout === 4
                  ? 'border-primary ring-1 ring-primary/20 scale-[1.02]'
                  : 'border-outline-variant/40 hover:border-primary'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Lock className="text-secondary w-6 h-6 stroke-[1.5]" />
                <span className="font-label-caps-sm text-label-caps-sm text-secondary tracking-widest uppercase">
                  04 / SECRECY
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-medium mb-2">
                Hidden Zipper Pocket
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                A discreet place to keep your essentials close while you relax, swim, or read your favorite book.
              </p>
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-caps-sm text-[10px]">
                <span>SEALED ZIPPER</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
