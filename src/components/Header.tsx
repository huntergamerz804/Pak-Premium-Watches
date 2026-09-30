import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, MessageSquare, Camera, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, wishlist, openCart, openSearch, openConcierge, openWatchAnalysis } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#222222]/80 py-3.5 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-[#F4F0E8] hover:text-[#C7A86B] transition-colors uppercase select-none flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A86B]"
          aria-label="AUREN Atelier Horloger Homepage"
        >
          AUREN
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav
          className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.16em] uppercase text-[#9C9A94] font-medium"
          aria-label="Primary Navigation"
        >
          <a
            href="#collection"
            className="hover:text-[#F4F0E8] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C7A86B] hover:after:w-full after:transition-all after:duration-300"
          >
            Collection
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-[#F4F0E8] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C7A86B] hover:after:w-full after:transition-all after:duration-300"
          >
            Craftsmanship
          </a>
          <a
            href="#movement"
            className="hover:text-[#F4F0E8] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C7A86B] hover:after:w-full after:transition-all after:duration-300"
          >
            The Movement
          </a>
          <a
            href="#heritage"
            className="hover:text-[#F4F0E8] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C7A86B] hover:after:w-full after:transition-all after:duration-300"
          >
            Heritage
          </a>
          <a
            href="#journal"
            className="hover:text-[#F4F0E8] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C7A86B] hover:after:w-full after:transition-all after:duration-300"
          >
            Journal
          </a>
        </nav>

        {/* Zone 3: Interactive Affordances */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Watch Visual Identifier / Analysis */}
          <button
            onClick={openWatchAnalysis}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider uppercase text-[#C7A86B] border border-[#C7A86B]/40 hover:border-[#C7A86B] hover:bg-[#C7A86B]/10 transition-all rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A86B]"
            title="Analyze a timepiece photo with Gemini 3.1 Pro"
            aria-label="Analyze Timepiece Photo"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Identify Watch</span>
          </button>

          {/* Horology Concierge */}
          <button
            onClick={openConcierge}
            className="flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider uppercase text-[#F4F0E8] hover:text-[#C7A86B] border border-[#222222] hover:border-[#C7A86B]/50 transition-all rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A86B]"
            title="Ask AUREN Horological Concierge"
            aria-label="Open Concierge"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C7A86B]" />
            <span className="hidden sm:inline">Concierge</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="p-2 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A86B]"
            aria-label="Search Timepieces"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Indicator */}
          {wishlist.length > 0 && (
            <a
              href="#collection"
              className="p-2 text-[#C7A86B] hover:text-[#D8BC82] transition-colors relative"
              aria-label={`Wishlist contains ${wishlist.length} item${wishlist.length > 1 ? 's' : ''}`}
            >
              <Heart className="w-4 h-4 fill-current" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C7A86B] text-[#050505] text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            </a>
          )}

          {/* Shopping Bag */}
          <button
            onClick={openCart}
            className="p-2 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A86B]"
            aria-label={`Shopping Bag, ${totalItems} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-[#C7A86B] text-[#050505] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={onOpenMobileMenu}
            className="p-2 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors lg:hidden rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A86B]"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
