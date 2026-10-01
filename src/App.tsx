/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { FeaturedCollection } from './components/FeaturedCollection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { HorologyConciergeModal } from './components/HorologyConciergeModal';
import { WatchAnalysisModal } from './components/WatchAnalysisModal';

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F0E8] flex flex-col font-sans selection:bg-[#C7A86B]/30 selection:text-[#F4F0E8]">
      {/* Sticky Header */}
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        <Hero />
        <FeaturedCollection />
        <TestimonialsSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Portals & Overlays */}
      <CartDrawer />
      <SearchModal />
      <ProductDetailModal />
      <CheckoutModal />
      <HorologyConciergeModal />
      <WatchAnalysisModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
