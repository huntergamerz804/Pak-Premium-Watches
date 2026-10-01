import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, ArrowRight, Truck, Copy, Check, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { JazzCashLogo } from './JazzCashLogo';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
    paymentMethod: 'jazzcash',
    jazzCashTid: '',
    specialNotes: '',
  });

  const [copiedJazzCash, setCopiedJazzCash] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [commissionId, setCommissionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isCheckoutOpen) return null;

  const copyNumber = () => {
    navigator.clipboard.writeText('03083536703');
    setCopiedJazzCash(true);
    setTimeout(() => setCopiedJazzCash(false), 2000);
  };

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
            <div className="text-center py-6 space-y-6">
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
                  Your formal acquisition has been logged. A Pak-Premium Private Client Liaison has been assigned to verify settlement and coordinate insured presentation packaging.
                </p>
              </div>

              {/* Order Info */}
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

              {/* JazzCash Settlement Details on Confirmation */}
              {formData.paymentMethod === 'jazzcash' && (
                <div className="p-4 bg-[#14080D] border border-[#D31044]/60 rounded-sm text-left max-w-md mx-auto text-xs space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#3D1422] pb-2">
                    <div className="flex items-center gap-2">
                      <JazzCashLogo size="sm" />
                      <span className="font-semibold text-white">JazzCash Payment Details</span>
                    </div>
                    <span className="text-[10px] text-[#FFDE00] font-mono uppercase bg-[#D31044]/20 px-2 py-0.5 rounded-sm">
                      Verified Account
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#2B0E19] pb-1.5">
                    <span className="text-[#8A7982]">Account Number:</span>
                    <span className="text-white font-mono font-bold text-sm">03083536703</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2B0E19] pb-1.5">
                    <span className="text-[#8A7982]">Account Name:</span>
                    <span className="text-[#FFDE00] font-serif font-medium text-sm">Rafiq Ahmed</span>
                  </div>
                  {formData.jazzCashTid && (
                    <div className="flex justify-between border-b border-[#2B0E19] pb-1.5">
                      <span className="text-[#8A7982]">Recorded TID:</span>
                      <span className="text-[#E8E5DE] font-mono">{formData.jazzCashTid}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-[#A898A0] pt-1">
                    Please ensure the transaction is completed from your JazzCash app to <strong>03083536703 (Rafiq Ahmed)</strong>. Your order will be confirmed immediately.
                  </p>
                </div>
              )}

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
                      placeholder="e.g. Lord Julian Vance / Mr. Ahmed"
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
                      placeholder="patron@domain.com"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Private Telephone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300 0000000 or +92 / +41..."
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
                      <option value="Pakistan">Pakistan</option>
                      <option value="Switzerland">Switzerland (Geneva HQ)</option>
                      <option value="United Kingdom">United Kingdom (Mayfair)</option>
                      <option value="United States">United States</option>
                      <option value="United Arab Emirates">United Arab Emirates (Dubai)</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan (Ginza)</option>
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
                      placeholder="Street, House/Suite, City"
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
                      placeholder="e.g. Quetta, Karachi, Lahore, Islamabad, Geneva"
                      className="w-full bg-[#121212] border border-[#242424] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6F6D68] mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="e.g. 87300 or 1204"
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
                <div className="space-y-3 text-xs">
                  {/* JAZZCASH Option */}
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-sm cursor-pointer transition-all ${
                      formData.paymentMethod === 'jazzcash'
                        ? 'border-[#D31044] bg-[#16080E] shadow-lg shadow-[#D31044]/10'
                        : 'border-[#222222] bg-[#0E0E0E] hover:border-[#333333]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="jazzcash"
                      checked={formData.paymentMethod === 'jazzcash'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash' })}
                      className="mt-1 text-[#D31044] accent-[#D31044]"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <JazzCashLogo size="sm" />
                        <span className="font-semibold text-[#F4F0E8] text-sm">
                          JazzCash Mobile Account
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#D31044]/20 border border-[#D31044]/40 text-[#FFDE00] text-[10px] font-mono tracking-wider uppercase">
                          Recommended
                        </span>
                      </div>
                      <div className="text-[11px] text-[#A898A0] mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span>
                          Account Number: <strong className="text-[#FFFFFF] font-mono">03083536703</strong>
                        </span>
                        <span>
                          Account Name: <strong className="text-[#FFDE00] font-serif">Rafiq Ahmed</strong>
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* JAZZCASH Interactive Card Details (expanded when selected) */}
                  {formData.paymentMethod === 'jazzcash' && (
                    <div className="p-4 sm:p-5 bg-gradient-to-br from-[#1C0B14] via-[#14080E] to-[#0D0408] border-2 border-[#D31044]/60 rounded-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#3D1422]">
                        <div className="flex items-center gap-3">
                          <JazzCashLogo size="md" />
                          <div>
                            <span className="text-xs font-mono uppercase tracking-wider text-[#FFDE00] font-semibold block">
                              Official JazzCash Account Details
                            </span>
                            <span className="text-[11px] text-[#A898A0]">
                              Direct transfer via JazzCash mobile app or USSD
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Account Number */}
                        <div className="p-3.5 bg-[#0A0306] border border-[#3D1422] rounded-sm">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9C8A93] block mb-1">
                            JazzCash Mobile Number
                          </span>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-lg sm:text-xl font-mono font-bold text-[#FFFFFF] tracking-wider">
                              03083536703
                            </span>
                            <button
                              type="button"
                              onClick={copyNumber}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm bg-[#D31044] hover:bg-[#E41B52] text-white transition-colors shadow-sm"
                            >
                              {copiedJazzCash ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#FFDE00]" />
                                  <span className="text-[#FFDE00] font-bold">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Account Title */}
                        <div className="p-3.5 bg-[#0A0306] border border-[#3D1422] rounded-sm">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9C8A93] block mb-1">
                            JazzCash Account Title (Receiver)
                          </span>
                          <span className="text-lg sm:text-xl font-serif font-medium text-[#FFDE00] tracking-wide block">
                            Rafiq Ahmed
                          </span>
                        </div>
                      </div>

                      {/* Step-by-Step Instructions */}
                      <div className="p-3.5 bg-[#0A0306]/90 rounded-sm border border-[#2F0F1B] text-[11px] text-[#C4B7BD] space-y-1.5">
                        <div className="font-semibold text-[#FFFFFF] flex items-center gap-2 mb-1 text-xs">
                          <Smartphone className="w-4 h-4 text-[#FFDE00]" />
                          <span>Simple steps to complete payment:</span>
                        </div>
                        <p>1. Open your <strong>JazzCash App</strong> or dial <strong>*786#</strong> on your phone.</p>
                        <p>2. Select <strong>Send Money</strong> &gt; <strong>To JazzCash Mobile Account</strong>.</p>
                        <p>3. Enter Mobile Number: <strong className="text-white font-mono bg-[#1A0B12] px-1.5 py-0.5 rounded">03083536703</strong></p>
                        <p>4. Verify the recipient name shows: <strong className="text-[#FFDE00] font-medium">Rafiq Ahmed</strong></p>
                        <p>5. Enter amount and enter your MPIN to finalize payment.</p>
                      </div>

                      {/* Transaction ID input */}
                      <div>
                        <label className="block text-[11px] text-[#A898A0] mb-1 font-mono">
                          JazzCash Transaction ID (TID) / Reference (Optional):
                        </label>
                        <input
                          type="text"
                          value={formData.jazzCashTid}
                          onChange={e => setFormData({ ...formData, jazzCashTid: e.target.value })}
                          placeholder="e.g. 0829104819 (received in SMS from 8558)"
                          className="w-full bg-[#0A0306] border border-[#3D1422] focus:border-[#FFDE00] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Swiss Wire */}
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

                    {/* Salon Escrow */}
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
                          Inspect in person at a Pak-Premium private salon prior to settlement.
                        </div>
                      </div>
                    </label>
                  </div>
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
                <span>Encrypted 256-bit Secure Transaction & Payment Privacy Protocol</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
