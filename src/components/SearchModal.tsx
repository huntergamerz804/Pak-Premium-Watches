import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openProductDetail } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.calibre.toLowerCase().includes(q) ||
        p.caseMaterial.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0C0C0C] border border-[#222222] rounded-sm max-w-2xl w-full p-6 shadow-2xl shadow-black z-10 text-[#F4F0E8] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#222222] pb-4">
          <Search className="w-5 h-5 text-[#C7A86B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by calibre, material, name (e.g. Nocturne, Tourbillon, Rose Gold)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#F4F0E8] placeholder-[#555555] focus:outline-none"
            aria-label="Search timepieces"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#6F6D68] hover:text-[#F4F0E8] text-xs p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm ml-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        {!query && (
          <div className="pt-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6D68] block mb-3">
              Frequent Inquiries:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Tourbillon', 'Nocturne', 'Chronometre', 'Rose Gold', '904L Steel', 'Calibre AR-08'].map(
                tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#222222] text-xs text-[#9C9A94] hover:text-[#F4F0E8] rounded-sm transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="mt-4 max-h-[60vh] overflow-y-auto divide-y divide-[#171717]">
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#6F6D68]">
                No timepieces match "{query}". Please adjust your criteria.
              </div>
            ) : (
              searchResults.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    closeSearch();
                    openProductDetail(p);
                  }}
                  className="flex items-center gap-4 py-3.5 px-2 hover:bg-[#121212] transition-colors cursor-pointer group rounded-sm"
                >
                  <div className="w-14 h-14 bg-[#181818] border border-[#222222] rounded-sm overflow-hidden shrink-0">
                    <img
                      src={p.primaryImage}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono text-[#C7A86B] uppercase tracking-wider">
                      {p.category}
                    </div>
                    <h4 className="font-serif text-base text-[#F4F0E8] group-hover:text-[#C7A86B] transition-colors truncate">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[#6F6D68] truncate font-light">
                      {p.calibre} · {p.caseMaterial}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-sans font-semibold text-[#F4F0E8] tabular-nums block">
                      ${p.price.toLocaleString('en-US')}
                    </span>
                    <span className="text-[10px] text-[#6F6D68] uppercase font-mono">
                      USD
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#6F6D68] group-hover:text-[#C7A86B] transition-transform group-hover:translate-x-1" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
