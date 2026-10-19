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
    openOrderPage,
    isSoldOut,
  } = useCart();

  const hasSoldOutItems = cartItems.some(i => isSoldOut(i.product.id));

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full sm:max-w-md w-full bg-[#0A0A0A] border-l border-[#222222] shadow-2xl flex flex-col justify-between z-10 text-[#F4F0E8]">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0E0E0E]">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base sm:text-lg tracking-wider uppercase text-[#F4F0E8]">
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="font-serif text-2xl text-[#6F6D68] mb-3">
                The bag is empty.
              </span>
              <p className="text-xs text-[#9C9A94] max-w-xs mb-6 font-light leading-relaxed">
                Discover the Pak-Premium mechanical watch collection and select a timepiece of enduring distinction.
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
              {cartItems.map(item => {
                const sold = isSoldOut(item.product.id);
                return (
                  <div
                    key={item.product.id}
                    className={`flex gap-4 p-4 rounded-sm border transition-all ${
                      sold ? 'bg-red-950/20 border-red-500/40' : 'bg-[#0E0E0E] border-[#1C1C1C]'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#161616] border border-[#222222] rounded-sm overflow-hidden shrink-0 relative">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-center ${sold ? 'grayscale opacity-70' : ''}`}
                      />
                      {sold && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center">
                          <span className="text-[8px] font-mono text-red-400 font-bold uppercase tracking-wider">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              {sold && (
                                <span className="text-[9px] font-mono text-red-400 bg-red-950/90 px-1.5 py-0.2 rounded-xs border border-red-500/40 uppercase font-bold">
                                  Sold Out
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-[#C7A86B] uppercase">
                                {item.product.category}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm text-[#F4F0E8] font-normal leading-snug">
                              {item.product.name}
                            </h4>
                          </div>
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
                        {/* Quantity Controls - Enforced 1 piece max */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-[#222222] rounded-sm bg-[#121212]">
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:text-[#C7A86B] transition-colors"
                              aria-label="Remove item"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono tabular-nums font-semibold">
                              {sold ? 0 : 1}
                            </span>
                            <button
                              disabled
                              className="p-1 text-[#444444] cursor-not-allowed"
                              title="Strict limit: Only 1 piece available per timepiece/deal"
                              aria-label="Cannot increase (Max 1 available)"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[10px] font-mono text-[#888888]">
                            {sold ? <span className="text-red-400">0 in Stock</span> : 'Limit: 1'}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-sans font-semibold text-[#F4F0E8] tabular-nums">
                            Rs {(item.product.price * (sold ? 0 : 1)).toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#1C1C1C] bg-[#0E0E0E] space-y-4">
            {/* Sold Out Warning in Cart */}
            {hasSoldOutItems && (
              <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-sm text-red-300 text-xs space-y-1">
                <span className="font-semibold block text-red-200">Timepiece Claimed</span>
                <p className="text-[11px] text-red-300/90 leading-relaxed">
                  One or more items in your bag have already been ordered and are now Sold Out. Please remove sold-out items to proceed with checkout.
                </p>
              </div>
            )}

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
                Rs {subtotal.toLocaleString('en-US')}
              </span>
            </div>

            {/* Action CTA */}
            <button
              onClick={openCheckout}
              disabled={hasSoldOutItems}
              className="w-full py-4 bg-[#C7A86B] hover:bg-[#D8BC82] disabled:opacity-50 disabled:bg-red-950/40 disabled:border disabled:border-red-500/40 disabled:text-red-400 disabled:cursor-not-allowed text-[#080808] font-semibold text-xs tracking-[0.2em] uppercase transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C7A86B]/15 cursor-pointer"
            >
              <span>{hasSoldOutItems ? 'Remove Sold Out Items to Checkout' : 'Proceed to Bespoke Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                closeCart();
                openOrderPage(cartItems[0]?.product);
              }}
              className="w-full py-3 bg-[#14120D] hover:bg-[#1E1911] border border-[#C7A86B]/60 hover:border-[#C7A86B] text-[#C7A86B] hover:text-[#EAD8B4] font-semibold text-xs tracking-[0.16em] uppercase transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Product Ordering Page ($300 Fee)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#A898A0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D31044]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span>JazzCash & EasyPaisa: <strong>03188849935</strong> (Saad Tanveer)</span>
            </div>

            <p className="text-[10px] text-center text-[#555555] font-light">
              Taxes calculated at dispatch. 30-day inspection privilege included.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
