import React from 'react';
import { X, Clock, Calendar, Bookmark, Share2 } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { useCart } from '../context/CartContext';

export const ArticleModal: React.FC = () => {
  const { selectedArticleId, closeArticleModal } = useCart();

  if (!selectedArticleId) return null;

  const article = JOURNAL_ARTICLES.find(a => a.id === selectedArticleId);
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeArticleModal}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0A0A0A] border border-[#222222] rounded-sm max-w-3xl w-full my-8 shadow-2xl shadow-black overflow-hidden z-10 text-[#F4F0E8] flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0E0E0E]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C7A86B]">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>
          <button
            onClick={closeArticleModal}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Hero Banner */}
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-[#1E1E1E]">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-4 text-xs text-[#6F6D68] uppercase tracking-wider mb-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C7A86B]" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C7A86B]" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif text-[#F4F0E8] font-normal leading-tight">
              {article.title}
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#C7A86B] font-serif italic border-l-2 border-[#C7A86B] pl-4 py-1 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[#9C9A94] leading-relaxed font-light">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between text-xs text-[#6F6D68]">
            <span className="font-mono uppercase tracking-widest text-[#C7A86B]">
              AUREN Horology Journal · Vol. IV
            </span>
            <button
              onClick={closeArticleModal}
              className="px-4 py-2 border border-[#2A2A2A] hover:border-[#C7A86B] text-[#F4F0E8] hover:text-[#C7A86B] uppercase tracking-wider text-xs rounded-sm transition-colors"
            >
              Back to Journal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
