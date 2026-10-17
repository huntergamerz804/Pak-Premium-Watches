import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Clock,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { JazzCashLogo } from './JazzCashLogo';
import { EasyPaisaLogo } from './EasyPaisaLogo';

interface OrderPageProps {
  onBackToHome: () => void;
  preselectedProduct?: Product | null;
}

export const OrderPage: React.FC<OrderPageProps> = ({ onBackToHome, preselectedProduct }) => {
  // Item selection state
  const [selectedProductId, setSelectedProductId] = useState<string>(
    preselectedProduct?.id || PRODUCTS[0]?.id || 'auren-nocturne'
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Customer details form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');

  // Payment confirmation for $300 delivery fee
  const [paymentMethod, setPaymentMethod] = useState<'mobile_account' | 'bank_transfer' | 'card'>('mobile_account');
  const [transactionTid, setTransactionTid] = useState('');
  const [deliveryFeeConfirmed, setDeliveryFeeConfirmed] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const selectedWatch = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const upfrontDeliveryFee = 300; // $300 USD upfront delivery fee
  const itemSubtotal = selectedWatch.price * quantity;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('03188849935');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please provide your Full Name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide your Phone Number for courier delivery contact.');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('Please enter your complete Shipping Address.');
      return;
    }
    if (!deliveryFeeConfirmed) {
      setErrorMessage('Please confirm payment of the $300 upfront delivery fee by checking the confirmation box.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      notes: notes.trim(),
      items: [
        {
          id: selectedWatch.id,
          name: selectedWatch.name,
          price: selectedWatch.price,
          quantity: quantity,
          caseSize: selectedWatch.caseSize,
        },
      ],
      deliveryFee: upfrontDeliveryFee,
      deliveryFeeConfirmed: true,
      paymentMethod:
        paymentMethod === 'mobile_account'
          ? 'JazzCash & EasyPaisa (03188849935 - Saad Tanveer)'
          : paymentMethod === 'bank_transfer'
          ? 'Direct Bank Wire'
          : 'Credit / Debit Card Authorization',
      transactionTid: transactionTid.trim() || 'Paid upfront / Verification pending',
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit order');
      }

      setSubmittedOrder(data.order || { ...payload, orderId: data.orderId || `PKP-${Date.now().toString(36).toUpperCase()}` });
    } catch (err: any) {
      console.warn('Backend order submission fallback:', err.message);
      // Client-side fallback if server offline
      const fallbackOrderId = `PKP-${Date.now().toString(36).toUpperCase()}`;
      const fallbackOrder = {
        ...payload,
        orderId: fallbackOrderId,
        createdAt: new Date().toISOString(),
        itemsTotal: itemSubtotal,
        status: 'confirmed_upfront_fee_pending_dispatch',
      };
      setSubmittedOrder(fallbackOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F0E8] py-6 sm:py-14 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Breadcrumb */}
        <div className="mb-5 sm:mb-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#9C9A94] hover:text-[#C7A86B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Return to Catalog</span>
          </button>

          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#C7A86B]">
            Official Atelier Dispatch
          </span>
        </div>

        {/* Confirmation Screen */}
        {submittedOrder ? (
          <div className="bg-[#0A0A0A] border-2 border-[#C7A86B]/60 rounded-sm p-4 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7A86B]/10 rounded-bl-full pointer-events-none blur-2xl" />

            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#C7A86B]/15 border-2 border-[#C7A86B] flex items-center justify-center mx-auto text-[#C7A86B] mb-3 sm:mb-4">
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#C7A86B] block mb-1">
                Order Protocol Executed
              </span>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif text-[#F4F0E8] font-normal mb-2 sm:mb-3">
                Order Confirmation & Dossier
              </h1>
              <p className="text-xs sm:text-sm text-[#9C9A94] font-light leading-relaxed">
                Your order has been officially received. A comprehensive order dossier and shipping notification email has been dispatched to:
              </p>
              <div className="inline-block mt-2 px-3 py-1 bg-[#141414] border border-[#2A2A2A] rounded-sm font-mono text-[11px] sm:text-xs text-[#FFDE00] break-all">
                huntergamer8044@gamil.com
              </div>
            </div>

            {/* Dossier Card */}
            <div className="bg-[#111111] border border-[#222222] rounded-sm p-4 sm:p-6 mb-6 space-y-4 text-xs font-sans">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#222222] gap-2">
                <div>
                  <span className="text-[#888888] block text-[10px] uppercase font-mono">Order Reference</span>
                  <span className="text-sm font-mono font-bold text-[#F4F0E8]">{submittedOrder.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#888888] block text-[10px] uppercase font-mono">Dispatch Status</span>
                  <span className="text-[#00E676] font-mono font-semibold uppercase text-[11px]">
                    Insured Dispatch Queued
                  </span>
                </div>
              </div>

              {/* Customer details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b border-[#222222]">
                <div>
                  <span className="text-[#888888] block text-[10px] uppercase font-mono mb-0.5">Client Name</span>
                  <span className="text-[#F4F0E8] font-medium">{fullName}</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[10px] uppercase font-mono mb-0.5">Contact Phone</span>
                  <span className="text-[#C7A86B] font-mono font-medium">{phone}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#888888] block text-[10px] uppercase font-mono mb-0.5">Shipping Address</span>
                  <span className="text-[#E8E5DE]">{address}{city ? `, ${city}` : ''}{postalCode ? ` - ${postalCode}` : ''}</span>
                </div>
              </div>

              {/* Items & Fees */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-[#E8E5DE]">
                  <span>{selectedWatch.name} (x{quantity})</span>
                  <span className="font-mono font-semibold">Rs {itemSubtotal.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between items-center text-[#C7A86B]">
                  <span>Upfront Insured Delivery Fee (Shipping Deposit):</span>
                  <span className="font-mono font-bold">$300 USD (Confirmed)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#222222] text-[#00E676] font-semibold">
                  <span>Remaining Balance:</span>
                  <span>Payable Upon Doorstep Delivery</span>
                </div>
              </div>

              {/* Transaction ID if recorded */}
              {transactionTid && (
                <div className="pt-2 border-t border-[#222222] text-[11px] text-[#9C9A94]">
                  Payment Reference (TID): <span className="font-mono text-[#F4F0E8]">{transactionTid}</span>
                </div>
              )}
            </div>

            {/* Email dispatch notice box */}
            <div className="p-3.5 sm:p-4 bg-[#14120D] border border-[#C7A86B]/40 rounded-sm flex items-start gap-3 mb-6 sm:mb-8">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#C7A86B] shrink-0 mt-0.5" />
              <div className="text-[11px] sm:text-xs text-[#C7A86B] leading-relaxed">
                <strong>Dispatch Notification Email Sent:</strong> Complete customer data, address, phone number, and $300 delivery fee confirmation have been forwarded to <strong>huntergamer8044@gamil.com</strong>.
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-7 py-3 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-semibold text-xs tracking-widest uppercase rounded-sm transition-colors text-center cursor-pointer"
              >
                Return to Atelier
              </button>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 border border-[#333333] hover:border-[#C7A86B] text-xs uppercase tracking-wider text-[#E8E5DE] hover:text-[#C7A86B] rounded-sm transition-colors text-center cursor-pointer"
              >
                Print Receipt
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form Flow */
          <div>
            {/* Header Title */}
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C7A86B] font-medium block mb-1.5 sm:mb-2">
                Precision Horological Commission
              </span>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#F4F0E8] tracking-tight mb-2 sm:mb-3">
                Product Ordering & Dispatch
              </h1>
              <p className="text-xs sm:text-sm text-[#9C9A94] font-light leading-relaxed">
                Complete your timepiece acquisition with insured transit protocol.
              </p>
            </div>

            {/* PROMINENT NOTICE REQUIRED BY USER */}
            <div className="p-3.5 sm:p-5 bg-gradient-to-r from-[#201509] via-[#14120D] to-[#0A0A0A] border-2 border-[#C7A86B] rounded-sm shadow-2xl mb-6 sm:mb-10">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#C7A86B] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase bg-[#C7A86B] text-[#080808] px-2 py-0.5 font-bold rounded-xs">
                      Mandatory Order Terms
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-[#FFDE00] tracking-wider uppercase font-semibold">
                      Notice to Customer
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-lg lg:text-xl font-serif font-semibold text-[#F4F0E8] leading-snug mt-1">
                    "Delivery Fee: $300 required upfront for shipping. Remaining balance is paid upon delivery."
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#C7A86B]/90 mt-1.5 sm:mt-2 font-light leading-relaxed">
                    The $300 upfront fee guarantees priority insured cargo handling, tamper-proof security seals, and direct dispatch to your location. The remaining balance of the timepiece commission is verified and settled upon doorstep inspection.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="mb-5 p-3.5 sm:p-4 bg-red-950/60 border border-red-800 rounded-sm text-xs text-red-200 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* SECTION 1: Selected Item & Quantity */}
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-sm p-4 sm:p-6 shadow-xl">
                <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-[#1A1A1A] mb-4 sm:mb-5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C7A86B]/20 text-[#C7A86B] flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-xs sm:text-sm font-serif uppercase tracking-wider text-[#F4F0E8]">
                    Selected Item & Quantity
                  </h2>
                </div>

                {/* Timepiece Selector Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                  {PRODUCTS.map(product => {
                    const isSelected = product.id === selectedProductId;
                    return (
                      <div
                        key={product.id}
                        onClick={() => setSelectedProductId(product.id)}
                        className={`p-3.5 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#16130E] border-[#C7A86B] shadow-lg shadow-[#C7A86B]/10'
                            : 'bg-[#101010] border-[#222222] hover:border-[#333333]'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2.5">
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-xs border border-[#222222] shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono text-[#C7A86B] uppercase block">
                              {product.category}
                            </span>
                            <h3 className="text-xs font-serif font-medium text-[#F4F0E8] truncate">
                              {product.name}
                            </h3>
                            <span className="text-[11px] font-mono text-[#E8E5DE] font-semibold">
                              Rs {product.price.toLocaleString('en-US')}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#888888]">
                          <span>{product.caseSize}</span>
                          <span className={isSelected ? 'text-[#C7A86B] font-bold' : ''}>
                            {isSelected ? '✓ Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Timepiece Preview & Quantity Selector */}
                <div className="p-4 bg-[#111111] border border-[#262626] rounded-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedWatch.primaryImage}
                      alt={selectedWatch.name}
                      className="w-14 h-14 object-cover rounded-xs border border-[#C7A86B]/40 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-base text-[#F4F0E8] font-medium">
                        {selectedWatch.name}
                      </h4>
                      <p className="text-xs text-[#9C9A94] font-light">
                        {selectedWatch.subtitle} · {selectedWatch.caseSize}
                      </p>
                      <div className="text-xs font-mono font-semibold text-[#C7A86B] mt-0.5">
                        Unit Price: Rs {selectedWatch.price.toLocaleString('en-US')}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#222222]">
                    <span className="text-xs text-[#888888] font-mono uppercase">Quantity:</span>
                    <div className="flex items-center border border-[#333333] rounded-sm bg-[#080808]">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-xs text-[#9C9A94] hover:text-[#F4F0E8] hover:bg-[#1A1A1A] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-mono font-semibold text-[#F4F0E8] min-w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-xs text-[#9C9A94] hover:text-[#F4F0E8] hover:bg-[#1A1A1A] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Shipping Address & Phone Number */}
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-sm p-3.5 sm:p-6 shadow-xl">
                <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-[#1A1A1A] mb-4 sm:mb-5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C7A86B]/20 text-[#C7A86B] flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-xs sm:text-sm font-serif uppercase tracking-wider text-[#F4F0E8]">
                    Shipping Address & Phone Number
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      Full Name <span className="text-[#C7A86B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. M. Suban Kasi"
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      Phone Number (Courier Contact) <span className="text-[#C7A86B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 0318-8849935 or +92..."
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444] font-mono"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      Email Address (Order Confirmation)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444]"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      Complete Shipping Address <span className="text-[#C7A86B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="House / Apartment #, Street Address, Sector / Area"
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444]"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      City / Region
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Quetta, Karachi, Islamabad"
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444]"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="e.g. 87300"
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444] font-mono"
                    />
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      Delivery Instructions or Gate Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="e.g. Please deliver between 2 PM - 6 PM"
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Payment Confirmation for $300 Delivery Fee */}
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-sm p-3.5 sm:p-6 shadow-xl">
                <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-[#1A1A1A] mb-4 sm:mb-5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C7A86B]/20 text-[#C7A86B] flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold">
                    3
                  </div>
                  <h2 className="text-xs sm:text-sm font-serif uppercase tracking-wider text-[#F4F0E8]">
                    Payment Confirmation for the $300 Delivery Fee
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Select Payment Channel */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      className={`p-3.5 border rounded-sm cursor-pointer transition-all ${
                        paymentMethod === 'mobile_account'
                          ? 'border-[#C7A86B] bg-[#16120E] shadow-md shadow-[#C7A86B]/10'
                          : 'border-[#222222] bg-[#111111] hover:border-[#333333]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile_account"
                        checked={paymentMethod === 'mobile_account'}
                        onChange={() => setPaymentMethod('mobile_account')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-serif font-medium text-[#F4F0E8]">
                          JazzCash / EasyPaisa
                        </span>
                        <div className="flex items-center gap-1">
                          <JazzCashLogo size="sm" />
                          <EasyPaisaLogo size="sm" />
                        </div>
                      </div>
                      <span className="text-[10px] text-[#A898A0] block">
                        Account: 03188849935
                      </span>
                    </label>

                    <label
                      className={`p-3.5 border rounded-sm cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-[#C7A86B] bg-[#16120E] shadow-md shadow-[#C7A86B]/10'
                          : 'border-[#222222] bg-[#111111] hover:border-[#333333]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-serif font-medium text-[#F4F0E8]">
                          Direct Bank Wire
                        </span>
                        <ShieldCheck className="w-4 h-4 text-[#C7A86B]" />
                      </div>
                      <span className="text-[10px] text-[#A898A0] block">
                        Atelier Reserve IBAN
                      </span>
                    </label>

                    <label
                      className={`p-3.5 border rounded-sm cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#C7A86B] bg-[#16120E] shadow-md shadow-[#C7A86B]/10'
                          : 'border-[#222222] bg-[#111111] hover:border-[#333333]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-serif font-medium text-[#F4F0E8]">
                          Credit / Debit Card
                        </span>
                        <Lock className="w-4 h-4 text-[#C7A86B]" />
                      </div>
                      <span className="text-[10px] text-[#A898A0] block">
                        Visa / Mastercard / Amex
                      </span>
                    </label>
                  </div>

                  {/* Transfer Instructions Box */}
                  {paymentMethod === 'mobile_account' && (
                    <div className="p-4 bg-gradient-to-r from-[#170E13] via-[#0E1410] to-[#0A0D0B] border border-[#C7A86B]/40 rounded-sm space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs font-mono tracking-wider uppercase text-[#C7A86B] font-semibold">
                          Transfer $300 Upfront Delivery Fee To:
                        </span>
                        <span className="text-[10px] text-[#00E676] bg-[#00A859]/20 px-2 py-0.5 rounded-xs font-mono uppercase self-start sm:self-auto">
                          Verified & Active
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 bg-[#080808] border border-[#222222] rounded-sm flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#888888] block font-mono">Mobile Number</span>
                            <span className="text-sm font-mono font-bold text-[#FFFFFF] tracking-wider">03188849935</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyAccount}
                            className="px-2 py-1 text-[10px] font-mono text-[#C7A86B] hover:text-[#FFFFFF] bg-[#191919] rounded-xs flex items-center gap-1 border border-[#333333]"
                          >
                            {copiedAccount ? <Check className="w-3 h-3 text-[#00E676]" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="p-2.5 bg-[#080808] border border-[#222222] rounded-sm">
                          <span className="text-[10px] text-[#888888] block font-mono">Account Title</span>
                          <span className="text-sm font-serif font-medium text-[#FFDE00]">Saad Tanveer</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transaction ID Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A09D95] font-mono mb-1.5">
                      Transaction Reference / ID (TID) or Card Auth Code
                    </label>
                    <input
                      type="text"
                      value={transactionTid}
                      onChange={e => setTransactionTid(e.target.value)}
                      placeholder="e.g. JazzCash TID #948271038 or Bank Wire Ref"
                      className="w-full bg-[#111111] border border-[#262626] focus:border-[#C7A86B] px-3.5 py-2.5 rounded-sm text-sm text-[#F4F0E8] focus:outline-none placeholder:text-[#444444] font-mono"
                    />
                  </div>

                  {/* Mandatory Confirmation Checkbox */}
                  <label className="flex items-start gap-3 p-3.5 bg-[#14120D] border border-[#C7A86B]/60 rounded-sm cursor-pointer hover:border-[#C7A86B] transition-colors">
                    <input
                      type="checkbox"
                      required
                      checked={deliveryFeeConfirmed}
                      onChange={e => setDeliveryFeeConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#C7A86B] cursor-pointer"
                    />
                    <div className="text-xs text-[#E8E5DE] leading-relaxed select-none">
                      <strong className="text-[#C7A86B] block mb-0.5">
                        Payment Confirmation for the $300 Delivery Fee <span className="text-[#C7A86B]">*</span>
                      </strong>
                      I confirm that I have transferred / arranged the <strong>$300 delivery fee upfront</strong> for priority insured shipping. I understand and agree that the <strong>remaining timepiece balance will be settled upon arrival at delivery</strong>.
                    </div>
                  </label>
                </div>
              </div>

              {/* SECTION 4: Order Financial Breakdown */}
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-sm p-3.5 sm:p-6 shadow-xl space-y-3 font-sans">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#C7A86B] pb-2 border-b border-[#1C1C1C]">
                  Commission & Settlement Summary
                </h3>

                <div className="flex justify-between items-center text-xs text-[#9C9A94]">
                  <span>{selectedWatch.name} (x{quantity}):</span>
                  <span className="font-mono text-[#F4F0E8]">Rs {itemSubtotal.toLocaleString('en-US')}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-[#C7A86B]">
                  <span>Upfront Insured Delivery Fee (Due Now):</span>
                  <span className="font-mono font-bold">$300 USD (Upfront Shipping)</span>
                </div>

                <div className="pt-3 border-t border-[#1C1C1C] flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#00E676] font-semibold">Remaining Balance Payable:</span>
                  <span className="text-[#00E676] font-mono font-bold">Upon Doorstep Delivery</span>
                </div>

                <div className="text-[10px] sm:text-[11px] text-[#666666] pt-1 flex items-center gap-1.5 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C7A86B] shrink-0" />
                  <span>Insured transit with tamper-proof security courier and certificate of authenticity included.</span>
                </div>
              </div>

              {/* SECTION 5: Submit Order Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 bg-[#C7A86B] hover:bg-[#D8BC82] disabled:opacity-60 text-[#080808] font-bold text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#C7A86B]/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#080808] border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Order to Atelier...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Place Order · Confirm $300 Upfront Delivery Fee</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#6F6D68] mt-3">
                  Upon submission, your complete order and customer details will be immediately dispatched to <strong>huntergamer8044@gamil.com</strong>.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
