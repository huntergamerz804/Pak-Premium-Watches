import React from 'react';
import { X, Search, ShoppingBag, Camera, MessageSquare, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const {
    totalItems,
    openCart,
    openSearch,
    openConcierge,
    openWatchAnalysis,
    openOrderPage,
    closeOrderPage,
    isOrderPageOpen,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#080808] border-l border-[#222222] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#1B1B1B]">
            <div className="flex items-center gap-1.5">
              <span className="font-serif tracking-[0.18em] text-base text-[#F4F0E8] font-semibold uppercase">
                PAK-PREMIUM
              </span>
              <span className="font-serif tracking-[0.2em] text-xs text-[#C7A86B] font-light uppercase">
                WATCHES
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 my-6">
            <button
              onClick={() => {
                onClose();
                openSearch();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#111111] hover:bg-[#171717] border border-[#222222] text-xs tracking-wider uppercase text-[#F4F0E8] transition-colors rounded-sm"
            >
              <Search className="w-3.5 h-3.5 text-[#C7A86B]" />
              Search
            </button>
            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#111111] hover:bg-[#171717] border border-[#222222] text-xs tracking-wider uppercase text-[#F4F0E8] transition-colors rounded-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C7A86B]" />
              Bag ({totalItems})
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 pt-2">
            <a
              href="#collection"
              onClick={() => {
                onClose();
                if (isOrderPageOpen) closeOrderPage();
              }}
              className="group flex items-center justify-between text-base font-serif tracking-wider text-[#F4F0E8] hover:text-[#C7A86B] py-2 border-b border-[#141414] transition-colors"
            >
              <span>The Collection</span>
              <ArrowRight className="w-4 h-4 text-[#6F6D68] group-hover:text-[#C7A86B] transition-colors" />
            </a>

            <button
              onClick={() => {
                onClose();
                openOrderPage();
              }}
              className="group flex items-center justify-between text-base font-serif tracking-wider text-[#C7A86B] hover:text-[#EAD8B4] py-2 border-b border-[#141414] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <span>Order Timepiece ($300 Delivery Fee)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#C7A86B] group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#testimonials"
              onClick={() => {
                onClose();
                if (isOrderPageOpen) closeOrderPage();
              }}
              className="group flex items-center justify-between text-base font-serif tracking-wider text-[#F4F0E8] hover:text-[#C7A86B] py-2 border-b border-[#141414] transition-colors"
            >
              <span>Client Testimonials</span>
              <ArrowRight className="w-4 h-4 text-[#6F6D68] group-hover:text-[#C7A86B] transition-colors" />
            </a>
          </nav>

          {/* AI Features */}
          <div className="mt-8 space-y-2.5 pt-6 border-t border-[#1B1B1B]">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#6F6D68] block mb-2 font-medium">
              Atelier Services
            </span>
            <button
              onClick={() => {
                onClose();
                openWatchAnalysis();
              }}
              className="w-full flex items-center justify-between p-3 bg-[#111111] hover:bg-[#171717] border border-[#C7A86B]/30 text-left transition-colors rounded-sm"
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-[#C7A86B]" />
                <div>
                  <div className="text-xs font-medium text-[#F4F0E8] uppercase tracking-wider">
                    Identify Timepiece
                  </div>
                  <div className="text-[11px] text-[#9C9A94]">
                    AI Photo Analysis with Gemini 3.1 Pro
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C7A86B]" />
            </button>

            <button
              onClick={() => {
                onClose();
                openConcierge();
              }}
              className="w-full flex items-center justify-between p-3 bg-[#111111] hover:bg-[#171717] border border-[#222222] text-left transition-colors rounded-sm"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#C7A86B]" />
                <div>
                  <div className="text-xs font-medium text-[#F4F0E8] uppercase tracking-wider">
                    Horological Concierge
                  </div>
                  <div className="text-[11px] text-[#9C9A94]">
                    Live Bespoke Watch Advisory
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9C9A94]" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#1B1B1B] text-center space-y-1.5">
          <div className="text-[11px] tracking-[0.18em] uppercase text-[#6F6D68]">
            Pak-Premium Watches · Atelier Horloger
          </div>
          <div className="text-[10px] text-[#555555]">
            First Owner: <span className="text-[#888888]">M. Suban Kasi</span> · Second Owner: <span className="text-[#888888]">M. Ali Khan</span>
          </div>
          <div className="text-[10px] text-[#C7A86B]/90 font-mono">
            Full-Stack Web Developer: M. Awais Khaild Noorzai
          </div>
        </div>
      </div>
    </div>
  );
};
