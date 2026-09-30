import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Switzerland',
    paymentMethod: 'wire',
    specialNotes: '',
  });

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [commissionId, setCommissionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address || !formData.city) {
      setError('Please fill in all required delivery fields.');
      return;
    }
    setError('');
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `AR-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
      setCommissionId(generatedId);
      setIsProcessing(false);
      setIsConfirmed(true);
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0A0A0A] border border-[#222222] rounded-sm max-w-2xl w-full my-6 shadow-2xl shadow-black z-10 text-[#F4F0E8] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0E0E0E]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C7A86B]" />
            <span className="font-serif text-base tracking-wider uppercase text-[#F4F0E8]">
              {isConfirmed ? 'Commission Confirmed' : 'Bespoke Acquisition Protocol'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {isConfirmed ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#C7A86B]/10 border border-[#C7A86B] flex items-center justify-center mx-auto text-[#C7A86B]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#C7A86B] block mb-2">
                  Atelier Dossier Inscribed
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F0E8] font-normal mb-2">
                  Commission Registry {commissionId}
                </h2>
                <p className="text-xs text-[#9C9A94] max-w-md mx-auto leading-relaxed font-light">
                  Your formal acquisition has been logged. An AUREN Private Client Liaison has been assigned to coordinate armored courier transit and presentation packaging.
                </p>
              </div>

              <div className="p-4 bg-[#111111] border border-[#1C1C1C] rounded-sm text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-[#191919] pb-1.5">
                  <span className="text-[#6F6D68]">Patron:</span>
                  <span className="text-[#E8E5DE] font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#191919] pb-1.5">
                  <span className="text-[#6F6D68]">Correspondence:</span>
                  <span className="text-[#E8E5DE] font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-[#191919] pb-1.5">
                  <span className="text-[#6F6D68]">Delivery Destination:</span>
                  <span className="text-[#E8E5DE] font-medium">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#6F6D68]">Total Allocation:</span>
                  <span className="text-[#C7A86B] font-mono font-semibold">${subtotal.toLocaleString('en-US')} USD</span>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-semibold text-xs tracking-widest uppercase rounded-sm transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Mini Summary */}
              <div className="p-4 bg-[#0E0E0E] border border-[#1C1C1C] rounded-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#6F6D68] uppercase font-mono tracking-wider">
                    Total Timepiece Commission:
                  </span>
                  <span className="text-sm font-semibold text-[#F4F0E8] font-mono">
                    ${subtotal.toLocaleString('en-US')} USD
                  </span>
                </div>
                <div className="text-[11px] text-[#C7A86B] flex items-center gap-1.5 font-light">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Complimentary Insured Armored Freight Included</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#C7A86B] mb-3">
                  Patron Delivery Protocol
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Lord Julian Vance"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Confidential Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patron@domain.ch"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Private Telephone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 22 000 0000"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Destination Country</label>
                    <select
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    >
                      <option value="Switzerland">Switzerland (Geneva HQ)</option>
                      <option value="United Kingdom">United Kingdom (Mayfair)</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan (Ginza)</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Armored Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street, Suite, Private Residence"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Geneva, London, New York"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="e.g. 1204"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Settlement Method */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#C7A86B] mb-3">
                  Settlement Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`flex items-start gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors ${
                      formData.paymentMethod === 'wire'
                        ? 'border-[#C7A86B] bg-[#121212]'
                        : 'border-[#222222] bg-[#0E0E0E]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wire"
                      checked={formData.paymentMethod === 'wire'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                      className="mt-0.5 text-[#C7A86B] accent-[#C7A86B]"
                    />
                    <div>
                      <div className="font-semibold text-[#F4F0E8]">Direct Swiss IBAN Wire</div>
                      <div className="text-[11px] text-[#6F6D68] mt-0.5">
                        Pro-forma invoice issued directly from Banque Cantonale de Genève.
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors ${
                      formData.paymentMethod === 'concierge'
                        ? 'border-[#C7A86B] bg-[#121212]'
                        : 'border-[#222222] bg-[#0E0E0E]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="concierge"
                      checked={formData.paymentMethod === 'concierge'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'concierge' })}
                      className="mt-0.5 text-[#C7A86B] accent-[#C7A86B]"
                    />
                    <div>
                      <div className="font-semibold text-[#F4F0E8]">Atelier Salon Escrow</div>
                      <div className="text-[11px] text-[#6F6D68] mt-0.5">
                        Inspect in person at an AUREN private salon prior to settlement.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {error && (
                <p className="text-xs text-[#E57373] font-mono">{error}</p>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#C7A86B] hover:bg-[#D8BC82] disabled:opacity-50 text-[#080808] font-semibold text-xs tracking-[0.2em] uppercase transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C7A86B]/15"
              >
                {isProcessing ? (
                  <span>Inscribing Commission Protocol...</span>
                ) : (
                  <>
                    <span>Confirm Atelier Commission</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6F6D68]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C7A86B]" />
                <span>Encrypted 256-bit Swiss Banking Privacy Protocol</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
