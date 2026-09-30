import React, { useState } from 'react';
import { X, Heart, Shield, Plus, Minus, Check, ArrowRight, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openConcierge,
  } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedStrap, setSelectedStrap] = useState<string>('');
  const [openAccordion, setOpenAccordion] = useState<string>('specs');

  if (!selectedProduct) return null;

  const isWishlisted = isInWishlist(selectedProduct.id);
  const gallery = selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0
    ? selectedProduct.galleryImages
    : [selectedProduct.primaryImage];

  const currentStrap = selectedStrap || selectedProduct.strap;

  const strapOptions = [
    selectedProduct.strap,
    'Supple Slate Gray Calfskin with Contrast Stitching',
    'Matte Black Louisiana Alligator with Quick-Release',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeProductDetail}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0A0A0A] border border-[#222222] rounded-sm max-w-5xl w-full my-6 shadow-2xl shadow-black z-10 text-[#F4F0E8] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0E0E0E]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C7A86B]">
            <span>{selectedProduct.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedProduct.caseSize}</span>
          </div>
          <button
            onClick={closeProductDetail}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Image Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image Frame */}
              <div className="relative aspect-[4/3] bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-[#222222] rounded-sm overflow-hidden shadow-xl">
                <img
                  src={gallery[activeImageIndex] || selectedProduct.primaryImage}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                {selectedProduct.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#C7A86B] bg-[#050505]/90 px-3 py-1 border border-[#C7A86B]/30 rounded-sm">
                      {selectedProduct.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Selector */}
              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-sm overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#C7A86B] ring-1 ring-[#C7A86B]/40'
                          : 'border-[#222222] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${selectedProduct.name} view ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Contiguous Purchase Module (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Title & Subtitle */}
                <h1 className="text-2xl sm:text-3xl font-serif text-[#F4F0E8] font-normal leading-tight mb-1">
                  {selectedProduct.name}
                </h1>
                <p className="text-xs text-[#9C9A94] font-light mb-4">
                  {selectedProduct.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#1A1A1A]">
                  <span className="text-2xl sm:text-3xl font-sans font-semibold text-[#F4F0E8] tabular-nums">
                    ${selectedProduct.price.toLocaleString('en-US')}
                  </span>
                  <span className="text-xs text-[#6F6D68] uppercase font-mono">
                    USD · Free Insured Delivery
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs text-[#9C9A94] leading-relaxed font-light mb-6">
                  {selectedProduct.description}
                </p>

                {/* Key Bullet Features */}
                <div className="space-y-2 mb-6 bg-[#0E0E0E] p-4 border border-[#1A1A1A] rounded-sm">
                  {selectedProduct.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#E8E5DE]">
                      <Check className="w-3.5 h-3.5 text-[#C7A86B] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Strap Customization Selector */}
                <div className="mb-6">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#6F6D68] block mb-2">
                    Strap Configuration:
                  </label>
                  <select
                    value={currentStrap}
                    onChange={e => setSelectedStrap(e.target.value)}
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#C7A86B] text-xs text-[#E8E5DE] px-3.5 py-2.5 rounded-sm focus:outline-none cursor-pointer"
                  >
                    {strapOptions.map((st, i) => (
                      <option key={i} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity & Buy CTAs */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#2A2A2A] rounded-sm bg-[#121212]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-3 hover:text-[#C7A86B] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-medium tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-3 hover:text-[#C7A86B] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Primary Buy CTA */}
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, quantity, currentStrap);
                        closeProductDetail();
                      }}
                      className="flex-1 py-3.5 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-semibold text-xs tracking-[0.18em] uppercase transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C7A86B]/15"
                    >
                      <span>Acquire Timepiece</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(selectedProduct.id)}
                      className={`p-3.5 border rounded-sm transition-colors ${
                        isWishlisted
                          ? 'border-[#C7A86B] bg-[#C7A86B] text-[#080808]'
                          : 'border-[#2A2A2A] hover:border-[#C7A86B] text-[#9C9A94] hover:text-[#C7A86B]'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Ask Concierge Link */}
                  <button
                    onClick={() => {
                      closeProductDetail();
                      openConcierge();
                    }}
                    className="w-full py-2.5 border border-[#1E1E1E] hover:border-[#C7A86B]/40 text-xs text-[#9C9A94] hover:text-[#F4F0E8] uppercase tracking-wider rounded-sm transition-colors text-center"
                  >
                    Have Questions? Inquire with our Master Horologist
                  </button>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="pt-4 border-t border-[#1A1A1A] flex items-center justify-between text-[11px] text-[#6F6D68]">
                <span>Numbered Certificate Included</span>
                <span>·</span>
                <span>Insured Global Transit</span>
                <span>·</span>
                <span>30-Day Inspection</span>
              </div>
            </div>
          </div>

          {/* Collapsible Accordions (Specs, Craft, Shipping) */}
          <div className="mt-12 pt-8 border-t border-[#1C1C1C] space-y-4">
            {/* Accordion 1: Full Horological Specifications */}
            <div className="border border-[#1E1E1E] rounded-sm overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                className="w-full flex items-center justify-between p-4 bg-[#0E0E0E] text-left hover:bg-[#141414] transition-colors"
              >
                <span className="text-xs uppercase tracking-widest font-mono text-[#F4F0E8]">
                  Complete Horological Specifications
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C7A86B] transition-transform duration-300 ${
                    openAccordion === 'specs' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openAccordion === 'specs' && (
                <div className="p-6 bg-[#080808] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {selectedProduct.specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between py-1.5 border-b border-[#141414]">
                      <span className="text-[#6F6D68] uppercase font-mono">{s.label}</span>
                      <span className="text-[#E8E5DE] font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 2: Insured Shipping & Servicing */}
            <div className="border border-[#1E1E1E] rounded-sm overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                className="w-full flex items-center justify-between p-4 bg-[#0E0E0E] text-left hover:bg-[#141414] transition-colors"
              >
                <span className="text-xs uppercase tracking-widest font-mono text-[#F4F0E8]">
                  Insured Armored Delivery & 5-Year Warranty
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C7A86B] transition-transform duration-300 ${
                    openAccordion === 'shipping' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openAccordion === 'shipping' && (
                <div className="p-6 bg-[#080808] text-xs text-[#9C9A94] space-y-3 leading-relaxed">
                  <p>
                    Every AUREN timepiece is dispatched in an armored, tamper-evident presentation casket via specialized high-value courier (Ferrari Group / Malca-Amit / Brinks) with signature-required delivery.
                  </p>
                  <p>
                    The 5-Year Atelier Warranty covers all mechanical malfunctions arising from materials or assembly. A complimentary complete movement check-up and water resistance reseal is provided at year three.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
