import React, { useState, useMemo } from 'react';
import { Eye, Heart, ArrowUpRight, Plus, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const FeaturedCollection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'diameter'>('featured');
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist } = useCart();

  const categories = [
    'All',
    'Tourbillon & Skeleton',
    'Classic Chronometre',
    'Precious Metals',
    'Sport & Chronograph',
    'Integrated Sports',
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'diameter') {
      result.sort((a, b) => parseFloat(a.caseSize) - parseFloat(b.caseSize));
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <section id="collection" className="py-20 sm:py-28 bg-[#080808] border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#C7A86B]/60" aria-hidden="true" />
              <span>Permanent & Atelier Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
              THE COLLECTION
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9C9A94] leading-relaxed font-light">
              Mechanical timepieces designed around precision, proportion, and enduring character. Hand-assembled in limited annual allocations.
            </p>
          </div>

          {/* Sorting Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#6F6D68] hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#111111] border border-[#222222] hover:border-[#C7A86B]/40 text-xs tracking-wider uppercase text-[#E8E5DE] px-3.5 py-2 rounded-sm focus:outline-none focus:border-[#C7A86B] cursor-pointer"
              aria-label="Sort timepieces"
            >
              <option value="featured">Featured Allocation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="diameter">Case Diameter</option>
            </select>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded-sm whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#C7A86B] text-[#080808] shadow-md shadow-[#C7A86B]/10'
                    : 'bg-[#111111] hover:bg-[#181818] text-[#9C9A94] hover:text-[#F4F0E8] border border-[#1C1C1C]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const isWishlisted = isInWishlist(product.id);

            return (
              <article
                key={product.id}
                className="group relative bg-[#0D0D0D] border border-[#1E1E1E] hover:border-[#C7A86B]/40 rounded-sm overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1"
              >
                {/* Image Section */}
                <div
                  className="relative aspect-[4/3] bg-gradient-to-b from-[#141414] to-[#0D0D0D] overflow-hidden cursor-pointer"
                  onClick={() => openProductDetail(product)}
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Vignette */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/20 opacity-80 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Subtle Badge (Zero-Pill discipline: unboxed clean text) */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[11px] font-mono tracking-widest text-[#C7A86B] uppercase font-medium bg-[#080808]/85 px-2.5 py-1 border border-[#C7A86B]/30 rounded-sm backdrop-blur-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-4 right-4 z-10 p-2.5 rounded-sm backdrop-blur-sm border transition-all ${
                      isWishlisted
                        ? 'bg-[#C7A86B] text-[#080808] border-[#C7A86B]'
                        : 'bg-[#080808]/70 hover:bg-[#080808] text-[#9C9A94] hover:text-[#C7A86B] border-[#222222]'
                    }`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Hover Overlay Quick Actions */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        openProductDetail(product);
                      }}
                      className="px-3.5 py-2 bg-[#171717]/90 hover:bg-[#222222] text-[#F4F0E8] text-[11px] tracking-wider uppercase font-medium flex items-center gap-1.5 border border-[#333333] rounded-sm transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C7A86B]" />
                      <span>Inspect</span>
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-3.5 py-2 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] text-[11px] tracking-wider uppercase font-semibold flex items-center gap-1.5 rounded-sm transition-colors shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#6F6D68] uppercase tracking-wider mb-2 font-mono">
                      <span>{product.caseSize}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.movement.split(' ')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.powerReserve}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => openProductDetail(product)}
                      className="text-xl font-serif text-[#F4F0E8] hover:text-[#C7A86B] transition-colors cursor-pointer mb-1.5 font-normal tracking-wide"
                    >
                      {product.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-[#9C9A94] line-clamp-1 mb-4 font-light">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Card Bottom Row: Price & Trigger */}
                  <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#6F6D68] block">
                        Acquisition Price
                      </span>
                      <span className="text-base font-sans font-semibold text-[#F4F0E8] tabular-nums tracking-tight">
                        ${product.price.toLocaleString('en-US')}
                        <span className="text-xs text-[#6F6D68] font-normal ml-1 font-mono">USD</span>
                      </span>
                    </div>

                    <button
                      onClick={() => openProductDetail(product)}
                      className="p-2 text-[#9C9A94] hover:text-[#C7A86B] transition-colors flex items-center gap-1 text-xs tracking-wider uppercase font-medium"
                      aria-label={`View details for ${product.name}`}
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All CTAs */}
        {activeCategory !== 'All' && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setActiveCategory('All')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#2A2A2A] hover:border-[#C7A86B] text-xs uppercase tracking-[0.18em] text-[#E8E5DE] hover:text-[#C7A86B] transition-colors rounded-sm"
            >
              <span>View All 6 Timepieces</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
