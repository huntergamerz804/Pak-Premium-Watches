import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle, PenLine, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const ReviewModal: React.FC = () => {
  const { isReviewModalOpen, closeReviewModal, reviewWatchName, addReview } = useCart();
  
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [watchModel, setWatchModel] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isReviewModalOpen) {
      setWatchModel(reviewWatchName || PRODUCTS[0]?.name || '');
      setIsSubmitted(false);
      setError('');
    }
  }, [isReviewModalOpen, reviewWatchName]);

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!quote.trim()) {
      setError('Please write a brief summary of your experience.');
      return;
    }
    if (quote.trim().length < 10) {
      setError('Please write at least 10 characters.');
      return;
    }

    addReview({
      author: author.trim(),
      quote: quote.trim(),
      rating,
      watchModel: watchModel || undefined,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setAuthor('');
      setQuote('');
      setRating(5);
      setIsSubmitted(false);
      closeReviewModal();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeReviewModal}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0A0A0A] border border-[#222222] rounded-sm max-w-lg w-full my-2 sm:my-6 shadow-2xl shadow-black z-10 text-[#F4F0E8] overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#1A1A1A] bg-[#0E0E0E]">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-[#C7A86B]" />
            <span className="font-serif text-sm sm:text-base tracking-wider uppercase text-[#F4F0E8]">
              Customer Experience Review
            </span>
          </div>
          <button
            onClick={closeReviewModal}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm"
            aria-label="Close review modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-7">
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-[#C7A86B]/10 border border-[#C7A86B] flex items-center justify-center mx-auto text-[#C7A86B]">
                <CheckCircle className="w-6 sm:w-7 h-6 sm:h-7" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0E8] font-normal">
                Review Published
              </h3>
              <p className="text-xs text-[#9C9A94] max-w-sm mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-[#F4F0E8]">{author}</strong>. Your horological evaluation has been added to our verified Customer Experiences.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C7A86B] block mb-1">
                  Atelier Horloger Feedback
                </span>
                <p className="text-xs text-[#888888] font-light">
                  Share your impressions regarding case finishing, precision, or wrist feel.
                </p>
              </div>

              {error && (
                <div className="p-2.5 bg-red-950/40 border border-red-800/60 rounded-sm text-xs text-red-200">
                  {error}
                </div>
              )}

              {/* Star Rating Selector */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#A09D95] font-mono block mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-[#444444] hover:scale-110 transition-transform focus:outline-none"
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            active
                              ? 'text-[#C7A86B] fill-[#C7A86B]'
                              : 'text-[#333333]'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs text-[#C7A86B] font-mono ml-2 font-medium">
                    {rating === 5 && '5 / 5 · Masterpiece'}
                    {rating === 4 && '4 / 5 · Excellent'}
                    {rating === 3 && '3 / 5 · Satisfactory'}
                    {rating <= 2 && `${rating} / 5`}
                  </span>
                </div>
              </div>

              {/* Customer Name */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#A09D95] font-mono block mb-1.5">
                  Your Full Name <span className="text-[#C7A86B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="e.g. M. Suban Kasi"
                  className="w-full bg-[#111111] border border-[#222222] focus:border-[#C7A86B] rounded-sm px-3.5 py-2.5 text-base sm:text-xs text-[#F4F0E8] focus:outline-none placeholder:text-[#444444]"
                />
              </div>

              {/* Timepiece Model */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#A09D95] font-mono block mb-1.5">
                  Timepiece Model
                </label>
                <select
                  value={watchModel}
                  onChange={e => setWatchModel(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] focus:border-[#C7A86B] rounded-sm px-3.5 py-2.5 text-base sm:text-xs text-[#F4F0E8] focus:outline-none cursor-pointer"
                >
                  <option value="">General Atelier Experience</option>
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#A09D95] font-mono block mb-1.5">
                  Your Review & Experience <span className="text-[#C7A86B]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={e => setQuote(e.target.value)}
                  placeholder="Describe the craftsmanship, tactile crown feel, accuracy, or presence in natural light..."
                  className="w-full bg-[#111111] border border-[#222222] focus:border-[#C7A86B] rounded-sm p-3 text-base sm:text-xs text-[#F4F0E8] focus:outline-none placeholder:text-[#444444] resize-none leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="px-4 py-3 sm:py-2.5 text-xs text-[#888888] hover:text-[#F4F0E8] transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3.5 sm:py-2.5 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-semibold text-xs tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#C7A86B]/15"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
