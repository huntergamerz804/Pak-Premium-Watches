import React, { useState, useMemo } from 'react';
import { Eye, Heart, ArrowUpRight, Plus, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const FeaturedCollection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'diameter'>('featured');
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist, openOrderPage, isSoldOut } = useCart();

  const categories = [
    'All',
    'Deal',
    'Men',
    'Women',
  ];

  const collectionProducts = useMemo(() => {
    return PRODUCTS;
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...collectionProducts];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'diameter') {
      result.sort((a, b) => parseFloat(a.caseSize) - parseFloat(b.caseSize));
    }

    return result;
  }, [collectionProducts, activeCategory, sortBy]);

  return (
    <section id="collection" className="py-16 sm:py-28 bg-[#080808] border-b border-[#171717] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#C7A86B]/60" aria-hidden="true" />
              <span>Permanent & Atelier Works</span>
            </div>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
              THE COLLECTION
            </h2>
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-[#9C9A94] leading-relaxed font-light">
              Limited 1-of-1 allocations. Each timepiece is uniquely numbered and immediately marked as Sold Out once reserved.
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
              className="bg-[#111111] border border-[#222222] hover:border-[#C7A86B]/40 text-xs tracking-wider uppercase text-[#E8E5DE] px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-[#C7A86B] cursor-pointer w-full sm:w-auto"
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
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 text-xs tracking-wider uppercase font-medium rounded-sm whitespace-nowrap transition-all duration-200 ${
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

        {/* Product Grid - Refined Medium Proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {filteredProducts.map(product => {
            const isWishlisted = isInWishlist(product.id);
            const soldOut = isSoldOut(product.id);

            return (
              <article
                key={product.id}
                className="group relative bg-[#0D0D0D] border border-[#1E1E1E] hover:border-[#C7A86B]/40 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/70 hover:-translate-y-1 max-w-sm sm:max-w-none w-full mx-auto"
              >
                {/* Image Section - Medium Proportioned Frame */}
                <div
                  className="relative aspect-[4/3] max-h-48 sm:max-h-52 bg-gradient-to-b from-[#141414] to-[#0D0D0D] overflow-hidden cursor-pointer"
                  onClick={() => openProductDetail(product)}
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${soldOut ? 'grayscale contrast-125 opacity-70' : ''}`}
                    loading="lazy"
                  />

                  {/* Gradient Vignette */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/20 opacity-80 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap max-w-[85%]">
                    {soldOut ? (
                      <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase font-bold bg-red-950/90 px-2 py-0.5 border border-red-500/50 rounded-xs shadow-md backdrop-blur-sm animate-pulse">
                        SOLD OUT
                      </span>
                    ) : (
                      <>
                        {product.badge && (
                          <span className="text-[10px] font-mono tracking-widest text-[#C7A86B] uppercase font-medium bg-[#080808]/85 px-2 py-0.5 border border-[#C7A86B]/30 rounded-sm backdrop-blur-sm">
                            {product.badge}
                          </span>
                        )}
                        <span className="text-[9px] font-mono tracking-wider text-[#A3A199] uppercase bg-[#141414]/90 px-1.5 py-0.5 border border-[#333333] rounded-sm backdrop-blur-sm">
                          1 Piece Only
                        </span>
                      </>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-sm backdrop-blur-sm border transition-all ${
                      isWishlisted
                        ? 'bg-[#C7A86B] text-[#080808] border-[#C7A86B]'
                        : 'bg-[#080808]/70 hover:bg-[#080808] text-[#9C9A94] hover:text-[#C7A86B] border-[#222222]'
                    }`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Mobile Touch & Desktop Hover Quick Actions */}
                  <div className="absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        openProductDetail(product);
                      }}
                      className="px-2.5 sm:px-3 py-1.5 bg-[#171717]/95 hover:bg-[#222222] text-[#F4F0E8] text-[10px] tracking-wider uppercase font-medium flex items-center gap-1.5 border border-[#333333] rounded-sm transition-colors shadow-sm"
                    >
                      <Eye className="w-3 h-3 text-[#C7A86B]" />
                      <span>Inspect</span>
                    </button>

                    {soldOut ? (
                      <span className="px-2.5 sm:px-3 py-1.5 bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] tracking-wider uppercase font-semibold rounded-sm">
                        Sold Out
                      </span>
                    ) : (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="px-2.5 sm:px-3 py-1.5 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1.5 rounded-sm transition-colors shadow-md shadow-[#C7A86B]/20 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Content - Medium Balanced Padding */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with Size: Medium */}
                    <div className="flex items-center gap-2 text-[11px] text-[#6F6D68] uppercase tracking-wider mb-2 font-mono">
                      <span className={`font-semibold px-1.5 py-0.5 rounded-sm border ${soldOut ? 'text-red-400 bg-red-950/30 border-red-500/40' : 'text-[#C7A86B] bg-[#C7A86B]/15 border-[#C7A86B]/30'}`}>
                        {soldOut ? 'Claimed' : product.caseSize}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{product.movement.split(' ')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span className={soldOut ? 'text-red-400' : 'text-[#6F6D68]'}>{soldOut ? '0/1 Left' : '1/1 Left'}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => openProductDetail(product)}
                      className="text-lg font-serif text-[#F4F0E8] hover:text-[#C7A86B] transition-colors cursor-pointer mb-2 font-normal tracking-wide"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Card Bottom Row: Price & Trigger */}
                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
                    <div>
                      <span className="text-base font-sans font-semibold text-[#F4F0E8] tabular-nums tracking-tight">
                        Rs {product.price.toLocaleString('en-US')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {soldOut ? (
                        <span
                          className="px-2 py-1 bg-red-950/30 border border-red-500/40 text-red-400 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider rounded-xs opacity-80"
                        >
                          Sold Out
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openOrderPage(product);
                          }}
                          className="px-2 py-1 bg-[#17130E] hover:bg-[#251D14] border border-[#C7A86B]/60 hover:border-[#C7A86B] text-[#C7A86B] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                          title="Direct Order with $300 Upfront Shipping Fee"
                        >
                          Order
                        </button>
                      )}
                      <button
                        onClick={() => openProductDetail(product)}
                        className="p-1.5 text-[#9C9A94] hover:text-[#C7A86B] transition-colors flex items-center gap-1 text-xs tracking-wider uppercase font-medium cursor-pointer"
                        aria-label={`View details for ${product.name}`}
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
              <span>View All {collectionProducts.length} Timepieces</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
