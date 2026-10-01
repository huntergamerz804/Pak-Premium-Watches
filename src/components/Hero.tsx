import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { heroWatchImg } from '../data/products';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const { openProductDetail } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const featuredHeroProduct = PRODUCTS.find(p => p.id === 'auren-sovereign') || PRODUCTS[0];

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505]"
      aria-label="Pak-Premium Watches Showcase"
    >
      {/* Background Radial Spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] lg:w-[1000px] h-[700px] lg:h-[1000px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(199, 168, 107, 0.08) 0%, rgba(23, 23, 23, 0.6) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle fine horizontal grid hair lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Editorial Copy (7 cols on desktop) */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1 pt-4 lg:pt-0">
          {/* Eyebrow metadata */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C7A86B] uppercase mb-5 font-medium">
            <span className="w-6 h-[1px] bg-[#C7A86B]/60" aria-hidden="true" />
            <span>Geneva Horology · Limited Atelier Series</span>
          </div>

          {/* Major Heading */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-normal text-[#F4F0E8] leading-[1.06] tracking-tight mb-6 text-balance">
            ENGINEERED FOR ETERNITY.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#9C9A94] max-w-xl font-light leading-relaxed mb-8 sm:mb-10">
            Precision mechanical timepieces shaped by uncompromising craftsmanship. Hand-regulated escapements, proprietary calibres, and sculpted geometries designed to outlive ephemeral trends.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <a
              href="#collection"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-medium text-xs tracking-[0.18em] uppercase transition-all duration-300 rounded-sm shadow-lg shadow-[#C7A86B]/15 hover:shadow-[#C7A86B]/25 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A86B]"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Micro Trust Metadata */}
          <div className="pt-6 border-t border-[#1B1B1B] flex flex-wrap items-center gap-6 text-xs text-[#6F6D68]">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C7A86B]" />
              <span className="tracking-wide">72-Hour Power Reserve</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A86B]" />
              <span className="tracking-wide">5-Year Global Atelier Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Watch Photography Showcase (6 cols on desktop) */}
        <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 relative">
          {/* Subtle glowing halo behind watch */}
          <div
            className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#C7A86B]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Interactive Parallax Frame */}
          <div
            className="relative w-full max-w-[480px] sm:max-w-[540px] transition-transform duration-300 ease-out cursor-pointer group"
            style={{
              transform: reducedMotion
                ? 'none'
                : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            }}
            onClick={() => openProductDetail(featuredHeroProduct)}
          >
            {/* Primary Watch Image */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-sm overflow-hidden border border-[#222222]/80 bg-gradient-to-b from-[#111111] to-[#080808] shadow-2xl shadow-black/80">
              <img
                src={heroWatchImg}
                alt="Pak-Premium Sovereign Flying Tourbillon mechanical watch with visible open-worked escapement"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Cinematic Vignette Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-black/20 pointer-events-none"
                aria-hidden="true"
              />

              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C7A86B] font-medium block">
                    Flagship Piece
                  </span>
                  <span className="font-serif text-lg text-[#F4F0E8] font-normal">
                    Pak-Premium Sovereign Tourbillon
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#E8E5DE] font-mono tracking-tight block">
                    $5,600 USD
                  </span>
                  <span className="text-[10px] text-[#9C9A94] uppercase tracking-wider">
                    Click to Inspect
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Spec Tag */}
            <div className="hidden sm:flex absolute -bottom-3 -right-3 bg-[#111111]/95 backdrop-blur-sm border border-[#C7A86B]/30 px-3.5 py-2 shadow-xl items-center gap-2.5 rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C7A86B] animate-pulse" />
              <span className="text-[11px] font-mono text-[#F4F0E8] tracking-wider uppercase">
                Calibre AR-12 · 21,600 VPH
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
