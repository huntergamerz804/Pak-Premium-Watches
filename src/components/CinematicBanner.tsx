import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { nocturneBlackImg } from '../data/products';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const CinematicBanner: React.FC = () => {
  const { openProductDetail } = useCart();
  const signatureWatch = PRODUCTS.find(p => p.id === 'auren-nocturne') || PRODUCTS[0];

  return (
    <section className="relative py-28 sm:py-36 bg-[#040404] overflow-hidden border-b border-[#1A1A1A]">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={nocturneBlackImg}
          alt="AUREN Signature Nocturne Timepiece on dark reflective obsidian surface"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#040404] via-[#040404]/80 to-[#040404]/60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#040404] via-transparent to-[#040404]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A86B]" />
            <span>The Signature Commission</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-6xl font-serif text-[#F4F0E8] font-normal leading-[1.08] tracking-tight mb-6">
            TIME, REFINED.
          </h2>

          {/* Body */}
          <p className="text-base sm:text-lg text-[#9C9A94] font-light leading-relaxed mb-8 max-w-xl">
            A modern expression of traditional mechanical watchmaking. Conceived for those who view the passage of hours not as an obligation, but as an art form.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              onClick={() => openProductDetail(signatureWatch)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-sm shadow-xl shadow-[#C7A86B]/10 hover:shadow-[#C7A86B]/20"
            >
              <span>Discover The Signature Series</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="#movement"
              className="inline-flex items-center justify-center px-6 py-4 border border-[#F4F0E8]/20 hover:border-[#C7A86B] text-[#F4F0E8] hover:text-[#C7A86B] text-xs tracking-[0.2em] uppercase font-medium transition-colors rounded-sm"
            >
              <span>View Movement Specs</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
