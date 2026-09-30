import React from 'react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { openConcierge, openWatchAnalysis, openSearch } = useCart();

  return (
    <footer className="bg-[#050505] text-[#9C9A94] border-t border-[#1C1C1C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Brand & Manifesto */}
        <div className="pb-12 border-b border-[#171717] mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-3xl font-serif tracking-[0.25em] text-[#F4F0E8] uppercase block mb-2">
              AUREN
            </span>
            <p className="text-xs text-[#6F6D68] max-w-md font-light leading-relaxed">
              Atelier Horloger · Independent Swiss-inspired mechanical watchmaking. Geneva, Switzerland. Engineered for Eternity.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-[#C7A86B]">
            <span>Geneva</span>
            <span>·</span>
            <span>Zurich</span>
            <span>·</span>
            <span>London</span>
            <span>·</span>
            <span>Tokyo</span>
          </div>
        </div>

        {/* 4 Multi-Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 text-xs">
          {/* Col 1 */}
          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#F4F0E8] mb-4 font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#collection" className="hover:text-[#C7A86B] transition-colors">
                  All Timepieces
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#C7A86B] transition-colors">
                  Tourbillon & Skeleton
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#C7A86B] transition-colors">
                  Meridian Chronometres
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#C7A86B] transition-colors">
                  18k Sedna Rose Gold
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#C7A86B] transition-colors">
                  Bespoke Commissions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#F4F0E8] mb-4 font-semibold">
              The Atelier
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#heritage" className="hover:text-[#C7A86B] transition-colors">
                  Geneva Heritage
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[#C7A86B] transition-colors">
                  Hand-Finishing Metiers
                </a>
              </li>
              <li>
                <a href="#movement" className="hover:text-[#C7A86B] transition-colors">
                  Calibre AR Architecture
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#C7A86B] transition-colors">
                  Horology Journal
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#C7A86B] transition-colors">
                  Collector Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#F4F0E8] mb-4 font-semibold">
              Patron Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="cursor-pointer hover:text-[#C7A86B] transition-colors">
                  5-Year International Guarantee
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C7A86B] transition-colors">
                  Insured Armored Transport
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C7A86B] transition-colors">
                  Complete Servicing & Overhaul
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C7A86B] transition-colors">
                  Certificate of Chronometry
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#C7A86B] transition-colors">
                  Strap Sizing & Ergonomics
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#F4F0E8] mb-4 font-semibold">
              Atelier Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={openConcierge}
                  className="hover:text-[#C7A86B] transition-colors text-left"
                >
                  Ask Horological Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={openWatchAnalysis}
                  className="hover:text-[#C7A86B] transition-colors text-left"
                >
                  Analyze Watch Photo
                </button>
              </li>
              <li>
                <button
                  onClick={openSearch}
                  className="hover:text-[#C7A86B] transition-colors text-left"
                >
                  Archive Search
                </button>
              </li>
              <li>
                <span className="text-[#6F6D68]">Private Salon: +41 22 819 04 00</span>
              </li>
              <li>
                <span className="text-[#6F6D68]">concierge@auren-watches.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#555555] gap-4">
          <div>
            © {new Date().getFullYear()} AUREN Atelier Horloger SA. All rights reserved. Registered Geneva horological entity.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#9C9A94] cursor-pointer transition-colors">
              Privacy Discretion
            </span>
            <span className="hover:text-[#9C9A94] cursor-pointer transition-colors">
              Terms of Acquisition
            </span>
            <span className="hover:text-[#9C9A94] cursor-pointer transition-colors">
              Legal Notice
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
