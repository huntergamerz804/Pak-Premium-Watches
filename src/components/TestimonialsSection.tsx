import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/journal';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
            <span className="w-4 h-[1px] bg-[#C7A86B]" aria-hidden="true" />
            <span>Patronage & Dialogue</span>
            <span className="w-4 h-[1px] bg-[#C7A86B]" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
            VOICES OF COLLECTORS.
          </h2>
        </div>

        {/* Testimonials 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-[#0C0C0C] border border-[#1C1C1C] p-8 rounded-sm flex flex-col justify-between relative group hover:border-[#C7A86B]/30 transition-colors"
            >
              <div>
                <Quote className="w-5 h-5 text-[#C7A86B]/60 mb-5" />
                <p className="text-sm sm:text-base text-[#D8D5CE] font-serif italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#191919]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#F4F0E8] font-sans">
                  {t.author}
                </div>
                <div className="text-[11px] text-[#6F6D68] mb-1 font-mono">
                  {t.city}
                </div>
                <div className="text-[10px] text-[#C7A86B] uppercase tracking-widest font-mono">
                  {t.watchModel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
