import React from 'react';
import { Star, PenLine } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const TestimonialsSection: React.FC = () => {
  const { reviews, openReviewModal } = useCart();

  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
            Customer Experiences
          </h2>
          <div className="w-12 h-[1px] bg-[#C7A86B] mx-auto mt-4" aria-hidden="true" />
          <p className="mt-4 text-xs sm:text-sm text-[#9C9A94] font-light">
            Verified horological appraisals from distinguished collectors worldwide.
          </p>

          {/* Add Review Option Button for Customer */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => openReviewModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-[#191919] border border-[#C7A86B]/50 hover:border-[#C7A86B] text-xs font-mono uppercase tracking-[0.16em] text-[#C7A86B] hover:text-[#EAD8B4] rounded-sm transition-all shadow-lg shadow-black/50 group cursor-pointer"
              aria-label="Write a customer review"
            >
              <PenLine className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map(t => (
            <div
              key={t.id}
              className="bg-[#0C0C0C] border border-[#1C1C1C] p-6 sm:p-8 rounded-sm flex flex-col justify-between relative group hover:border-[#C7A86B]/30 transition-colors shadow-xl"
            >
              <div>
                {/* 5-Star Rating Indicator */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#C7A86B] fill-[#C7A86B]" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#D8D5CE] font-serif italic leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              <div className="pt-5 border-t border-[#191919] flex items-center justify-between">
                <div className="text-sm font-semibold uppercase tracking-wider text-[#F4F0E8] font-sans">
                  {t.author}
                </div>
                {t.date && (
                  <span className="text-[10px] text-[#666666] font-mono">
                    {t.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
