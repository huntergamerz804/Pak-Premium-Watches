import React from 'react';
import { X, Plus, Minus, Trash2, Shield, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#0A0A0A] border-l border-[#222222] shadow-2xl flex flex-col justify-between z-10 text-[#F4F0E8]">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0E0E0E]">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-lg tracking-wider uppercase text-[#F4F0E8]">
              Your Acquisition Bag
            </h2>
            <span className="text-xs font-mono text-[#C7A86B]">
              ({totalItems})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm"
            aria-label="Close acquisition bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List / Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="font-serif text-2xl text-[#6F6D68] mb-3">
                The bag is empty.
              </span>
              <p className="text-xs text-[#9C9A94] max-w-xs mb-6 font-light leading-relaxed">
                Discover the AUREN mechanical watch collection and select a timepiece of enduring distinction.
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-[#141414] hover:bg-[#1E1E1E] border border-[#2A2A2A] text-xs uppercase tracking-widest text-[#C7A86B] rounded-sm transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-[#0E0E0E] border border-[#1C1C1C] rounded-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#161616] border border-[#222222] rounded-sm overflow-hidden shrink-0">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm text-[#F4F0E8] font-normal leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#6F6D68] hover:text-[#E57373] transition-colors p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#6F6D68] font-mono mt-0.5">
                        {item.selectedStrap || item.product.strap}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#171717]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#222222] rounded-sm bg-[#121212]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-[#C7A86B] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-[#C7A86B] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-sans font-semibold text-[#F4F0E8] tabular-nums">
                          ${(item.product.price * item.quantity).toLocaleString('en-US')}
                        </span>
                        <span className="text-[10px] text-[#6F6D68] ml-1 font-mono">
                          USD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#1C1C1C] bg-[#0E0E0E] space-y-4">
            {/* Complimentary Insured Transport */}
            <div className="flex items-center gap-2 p-2.5 bg-[#121212] border border-[#222222] rounded-sm text-xs text-[#9C9A94]">
              <Shield className="w-4 h-4 text-[#C7A86B] shrink-0" />
              <span>Complimentary insured armored delivery & signature release.</span>
            </div>

            {/* Subtotal */}
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-xs uppercase tracking-widest text-[#9C9A94]">
                Subtotal (Excl. VAT / Duties)
              </span>
              <span className="text-xl font-sans font-bold text-[#F4F0E8] tabular-nums">
                ${subtotal.toLocaleString('en-US')}
                <span className="text-xs text-[#6F6D68] font-mono ml-1 font-normal">
                  USD
                </span>
              </span>
            </div>

            {/* Action CTA */}
            <button
              onClick={openCheckout}
              className="w-full py-4 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-semibold text-xs tracking-[0.2em] uppercase transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C7A86B]/15"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#555555] font-light">
              Taxes calculated at dispatch. 30-day inspection privilege included.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
