import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, ArrowRight, Truck, Copy, Check, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { JazzCashLogo } from './JazzCashLogo';
import { EasyPaisaLogo } from './EasyPaisaLogo';

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
    paymentMethod: 'mobile_account', // JazzCash & EasyPaisa
    walletProvider: 'both', // 'jazzcash' | 'easypaisa' | 'both'
    transactionTid: '',
    specialNotes: '',
  });

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [commissionId, setCommissionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isCheckoutOpen) return null;

  const copyNumber = () => {
    navigator.clipboard.writeText('03188849935');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0A0A0A] border border-[#222222] rounded-sm max-w-2xl w-full my-3 sm:my-6 shadow-2xl shadow-black z-10 text-[#F4F0E8] overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#1A1A1A] bg-[#0E0E0E]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C7A86B]" />
            <span className="font-serif text-sm sm:text-base tracking-wider uppercase text-[#F4F0E8]">
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
        <div className="overflow-y-auto p-4 sm:p-8 overflow-x-hidden">
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
                  <span className="text-[#C7A86B] font-mono font-semibold">Rs {subtotal.toLocaleString('en-US')}</span>
                </div>
              </div>

              {/* JazzCash / EasyPaisa Settlement Details on Confirmation */}
              {formData.paymentMethod === 'mobile_account' && (
                <div className="p-5 bg-gradient-to-br from-[#190D14] via-[#101410] to-[#0A0D0B] border border-[#C7A86B]/40 rounded-sm text-left max-w-md mx-auto text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2.5">
                    <div className="flex items-center gap-2">
                      <JazzCashLogo size="sm" />
                      <EasyPaisaLogo size="sm" />
                    </div>
                    <span className="text-[10px] text-[#00E676] font-mono uppercase bg-[#00A859]/20 border border-[#00A859]/40 px-2 py-0.5 rounded-sm">
                      Verified Receiver
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#222222] pb-1.5">
                    <span className="text-[#9C9A94]">JazzCash & EasyPaisa Number:</span>
                    <span className="text-white font-mono font-bold text-sm tracking-wider">03188849935</span>
                  </div>
                  <div className="flex justify-between border-b border-[#222222] pb-1.5">
                    <span className="text-[#9C9A94]">Account Title (Name):</span>
                    <span className="text-[#FFDE00] font-serif font-medium text-sm">Saad Tanveer</span>
                  </div>
                  {formData.transactionTid && (
                    <div className="flex justify-between border-b border-[#222222] pb-1.5">
                      <span className="text-[#9C9A94]">Recorded Transaction ID (TID):</span>
                      <span className="text-[#E8E5DE] font-mono font-semibold">{formData.transactionTid}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-[#A898A0] pt-1">
                    Please transfer the total amount via <strong>JazzCash</strong> or <strong>EasyPaisa</strong> to <strong className="text-white font-mono">03188849935</strong> (<strong className="text-[#FFDE00]">Saad Tanveer</strong>). Your order will be confirmed immediately.
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
                    Rs {subtotal.toLocaleString('en-US')}
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
                      placeholder="0318 0000000 or +92 / +41..."
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
                  {/* JAZZCASH & EASYPAISA Combined Option */}
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-sm cursor-pointer transition-all ${
                      formData.paymentMethod === 'mobile_account'
                        ? 'border-[#C7A86B] bg-[#141210] shadow-lg shadow-[#C7A86B]/10'
                        : 'border-[#222222] bg-[#0E0E0E] hover:border-[#333333]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile_account"
                      checked={formData.paymentMethod === 'mobile_account'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'mobile_account' })}
                      className="mt-1 text-[#C7A86B] accent-[#C7A86B]"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <JazzCashLogo size="sm" />
                        <EasyPaisaLogo size="sm" />
                        <span className="font-semibold text-[#F4F0E8] text-sm">
                          JazzCash & EasyPaisa Account
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#C7A86B]/20 border border-[#C7A86B]/40 text-[#FFDE00] text-[10px] font-mono tracking-wider uppercase">
                          Recommended
                        </span>
                      </div>
                      <div className="text-[11px] text-[#A898A0] mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span>
                          Account Number: <strong className="text-[#FFFFFF] font-mono tracking-wider">03188849935</strong>
                        </span>
                        <span>
                          Account Title: <strong className="text-[#FFDE00] font-serif">Saad Tanveer</strong>
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Interactive Details (expanded when selected) */}
                  {formData.paymentMethod === 'mobile_account' && (
                    <div className="p-4 sm:p-5 bg-gradient-to-br from-[#1C1217] via-[#121614] to-[#0A0D0C] border-2 border-[#C7A86B]/60 rounded-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2C2925]">
                        <div className="flex flex-wrap items-center gap-3">
                          <JazzCashLogo size="md" />
                          <EasyPaisaLogo size="md" />
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-sm bg-[#00A859]/20 border border-[#00A859]/50 text-[#00E676] text-[10px] font-mono tracking-widest uppercase self-start sm:self-auto">
                          Active & Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Account Number */}
                        <div className="p-3.5 bg-[#090A09] border border-[#2D332F] rounded-sm">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9C9A94] block mb-1">
                            Mobile Account Number (JazzCash & EasyPaisa)
                          </span>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-lg sm:text-xl font-mono font-bold text-[#FFFFFF] tracking-wider">
                              03188849935
                            </span>
                            <button
                              type="button"
                              onClick={copyNumber}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm bg-[#C7A86B] hover:bg-[#D8BC82] text-[#0A0A0A] font-semibold transition-colors shadow-sm"
                            >
                              {copiedNumber ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#008000]" />
                                  <span>Copied</span>
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
                        <div className="p-3.5 bg-[#090A09] border border-[#2D332F] rounded-sm">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9C9A94] block mb-1">
                            Account Title (Receiver Name)
                          </span>
                          <span className="text-lg sm:text-xl font-serif font-medium text-[#FFDE00] tracking-wide block">
                            Saad Tanveer
                          </span>
                        </div>
                      </div>

                      {/* Step-by-Step Instructions */}
                      <div className="p-3.5 bg-[#080808]/90 rounded-sm border border-[#222222] text-[11px] text-[#C4B7BD] space-y-2">
                        <div className="font-semibold text-[#FFFFFF] flex items-center gap-2 text-xs">
                          <Smartphone className="w-4 h-4 text-[#C7A86B]" />
                          <span>Simple Payment Instructions:</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {/* JazzCash steps */}
                          <div className="p-2.5 bg-[#14080E] border border-[#3D1422] rounded-sm">
                            <span className="font-bold text-[#FF3366] block mb-1 font-mono uppercase text-[10px]">
                              Via JazzCash:
                            </span>
                            <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#D8D0D5]">
                              <li>Open <strong>JazzCash App</strong> or dial <strong>*786#</strong></li>
                              <li>Select <strong>Send Money</strong> &gt; <strong>Mobile Account</strong></li>
                              <li>Enter Number: <strong className="text-white font-mono bg-[#2B0E19] px-1 py-0.5 rounded">03188849935</strong></li>
                              <li>Confirm Title: <strong className="text-[#FFDE00]">Saad Tanveer</strong></li>
                              <li>Enter amount and confirm with MPIN</li>
                            </ol>
                          </div>

                          {/* EasyPaisa steps */}
                          <div className="p-2.5 bg-[#032414] border border-[#006633] rounded-sm">
                            <span className="font-bold text-[#00E676] block mb-1 font-mono uppercase text-[10px]">
                              Via EasyPaisa:
                            </span>
                            <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#D0E0D8]">
                              <li>Open <strong>EasyPaisa App</strong> or dial <strong>*786#</strong></li>
                              <li>Select <strong>Send Money</strong> &gt; <strong>EasyPaisa Transfer</strong></li>
                              <li>Enter Number: <strong className="text-white font-mono bg-[#05381F] px-1 py-0.5 rounded">03188849935</strong></li>
                              <li>Confirm Title: <strong className="text-[#FFDE00]">Saad Tanveer</strong></li>
                              <li>Enter amount and tap Send Now</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      {/* Transaction ID input */}
                      <div>
                        <label className="block text-[11px] text-[#A898A0] mb-1 font-mono">
                          JazzCash / EasyPaisa Transaction ID (TID) / Reference (Optional):
                        </label>
                        <input
                          type="text"
                          value={formData.transactionTid}
                          onChange={e => setFormData({ ...formData, transactionTid: e.target.value })}
                          placeholder="e.g. 0829104819 (received in confirmation SMS)"
                          className="w-full bg-[#0A0A0A] border border-[#333333] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-[#F4F0E8] font-mono text-xs focus:outline-none"
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
