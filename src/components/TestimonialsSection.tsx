import React from 'react';
import { TESTIMONIALS } from '../data/journal';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
            Customer Experiences
          </h2>
          <div className="w-12 h-[1px] bg-[#C7A86B] mx-auto mt-4" aria-hidden="true" />
        </div>

        {/* Testimonials 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-[#0C0C0C] border border-[#1C1C1C] p-6 sm:p-8 rounded-sm flex flex-col justify-between relative group hover:border-[#C7A86B]/30 transition-colors"
            >
              <div>
                <p className="text-sm sm:text-base text-[#D8D5CE] font-serif italic leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              <div className="pt-5 border-t border-[#191919]">
                <div className="text-sm font-semibold uppercase tracking-wider text-[#F4F0E8] font-sans">
                  {t.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
