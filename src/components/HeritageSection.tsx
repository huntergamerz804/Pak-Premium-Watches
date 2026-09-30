import React from 'react';
import { ArrowRight, Compass, Shield } from 'lucide-react';
import { meridianSteelImg } from '../data/products';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-24 sm:py-32 bg-[#050505] text-[#F4F0E8] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Narrative (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#C7A86B]/60" aria-hidden="true" />
              <span>Geneva Atelier Story</span>
            </div>

            {/* Founding Year Accent */}
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-serif text-5xl sm:text-6xl text-[#C7A86B] font-light tracking-tight">
                1987
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#6F6D68] font-mono">
                Founding Year · Geneva
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F4F0E8] font-normal leading-[1.1] tracking-tight mb-6">
              INDEPENDENT WATCHMAKING WITHOUT COMPROMISE.
            </h2>

            {/* Prose */}
            <p className="text-sm sm:text-base text-[#9C9A94] font-light leading-relaxed mb-6">
              AUREN was founded on the shores of Lake Geneva by an intimate collective of independent chronometrists and metallurgical artisans. While the modern industry pivoted toward mass automation, AUREN remained devoted to the sanctity of the human bench.
            </p>

            <p className="text-sm sm:text-base text-[#9C9A94] font-light leading-relaxed mb-8">
              We produce fewer than eight hundred timepieces each calendar year. Each commission is tracked by an individual master watchmaker from the initial chamfering of the mainplate through the final five-position chronometric regulation.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#1C1C1C] mb-8">
              <div>
                <div className="font-mono text-2xl font-light text-[#F4F0E8] mb-1">
                  800
                </div>
                <div className="text-xs uppercase tracking-wider text-[#6F6D68]">
                  Annual Maximum Allocation
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-light text-[#F4F0E8] mb-1">
                  100%
                </div>
                <div className="text-xs uppercase tracking-wider text-[#6F6D68]">
                  Mechanical Calibres Only
                </div>
              </div>
            </div>

            <a
              href="#journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C7A86B] hover:text-[#D8BC82] transition-colors font-medium group"
            >
              <span>Read The Complete Atelier Chronicle</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Photographic Editorial Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#222222] bg-[#0E0E0E] shadow-2xl shadow-black">
              <img
                src={meridianSteelImg}
                alt="AUREN Meridian Chronometre representing traditional Geneva watchmaking heritage"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-black/20 pointer-events-none"
                aria-hidden="true"
              />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
                <span className="font-serif text-sm text-[#F4F0E8] tracking-wider">
                  The Meridian Workshop Archive
                </span>
                <span className="font-mono text-[10px] text-[#C7A86B] uppercase tracking-widest bg-[#050505]/80 px-2.5 py-1 border border-[#C7A86B]/30 rounded-sm">
                  Geneva, Switzerland
                </span>
              </div>
            </div>

            {/* Corner border detail */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#C7A86B]/40 pointer-events-none hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
