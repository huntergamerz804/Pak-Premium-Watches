import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { useCart } from '../context/CartContext';

export const JournalSection: React.FC = () => {
  const { openArticleModal } = useCart();

  return (
    <section id="journal" className="py-24 sm:py-32 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#C7A86B]/60" aria-hidden="true" />
              <span>Horological Journal</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
              THE CHRONICLE.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9C9A94] font-light leading-relaxed">
              Dispatches from our Geneva benches, essays on case architecture, and technical explorations into the mechanics of time.
            </p>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map(article => (
            <article
              key={article.id}
              onClick={() => openArticleModal(article.id)}
              className="group cursor-pointer bg-[#0D0D0D] border border-[#1C1C1C] hover:border-[#C7A86B]/40 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/70"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] bg-[#141414] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80"
                  aria-hidden="true"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#C7A86B] bg-[#050505]/90 px-2.5 py-1 border border-[#C7A86B]/30 rounded-sm backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6F6D68] uppercase font-mono mb-3">
                    <Clock className="w-3 h-3 text-[#C7A86B]" />
                    <span>{article.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-xl font-serif text-[#F4F0E8] group-hover:text-[#C7A86B] transition-colors mb-3 leading-snug font-normal">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#9C9A94] line-clamp-2 leading-relaxed font-light mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1A1A1A] flex items-center justify-between text-xs text-[#C7A86B] group-hover:text-[#D8BC82] font-medium tracking-wider uppercase">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
