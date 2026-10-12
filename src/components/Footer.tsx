import React from 'react';
import { Crown, Shield, Code2 } from 'lucide-react';
import { JazzCashLogo } from './JazzCashLogo';
import { EasyPaisaLogo } from './EasyPaisaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-[#9C9A94] border-t border-[#1C1C1C] pt-12 sm:pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Brand & Manifesto */}
        <div className="pb-10 sm:pb-12 border-b border-[#171717] mb-10 sm:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.2em] text-[#F4F0E8] font-semibold uppercase">
                PAK-PREMIUM
              </span>
              <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#C7A86B] uppercase font-light">
                WATCHES
              </span>
            </div>
            <p className="text-xs text-[#6F6D68] max-w-md font-light leading-relaxed">
              Atelier Horloger · Independent precision mechanical watchmaking. Engineered for Eternity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#C7A86B]">
            <span>Geneva</span>
            <span>·</span>
            <span>Zurich</span>
            <span>·</span>
            <span>London</span>
            <span>·</span>
            <span>Tokyo</span>
          </div>
        </div>

        {/* Atelier Leadership & Development Grand Showcase */}
        <div className="my-10 sm:my-16 relative overflow-hidden bg-gradient-to-b from-[#0F0F0F] via-[#090909] to-[#050505] border border-[#242424] rounded-sm p-5 sm:p-10 lg:p-16">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C7A86B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
              <span className="w-5 sm:w-8 h-[1px] bg-[#C7A86B]" aria-hidden="true" />
              <span>Executive Directorate & Engineering</span>
              <span className="w-5 sm:w-8 h-[1px] bg-[#C7A86B]" aria-hidden="true" />
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
              Founding Leadership & Digital Architecture
            </h2>
            <p className="text-xs sm:text-base text-[#9C9A94] mt-2.5 sm:mt-3 font-light leading-relaxed">
              Guiding the vision and heritage of Pak-Premium Watches with artisanal curation and state-of-the-art engineering.
            </p>
          </div>

          {/* 3 Prominent Large Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {/* First Owner */}
            <div className="bg-[#111111]/90 border border-[#262626] hover:border-[#C7A86B]/60 transition-all duration-300 p-5 sm:p-8 lg:p-10 rounded-sm relative group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 bg-[#C7A86B]/5 rounded-bl-full pointer-events-none group-hover:bg-[#C7A86B]/15 transition-colors" />
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#171717] border border-[#2A2A2A] group-hover:border-[#C7A86B]/50 flex items-center justify-center mb-5 sm:mb-6 transition-colors shadow-inner">
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A86B]" />
                </div>
                <span className="text-[11px] sm:text-sm uppercase font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#C7A86B] font-semibold block mb-1.5 sm:mb-2">
                  First Owner
                </span>
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl text-[#F4F0E8] font-medium tracking-wide mb-2 sm:mb-3 break-words">
                  M.suban kasi
                </h3>
              </div>
              <div className="pt-5 sm:pt-6 border-t border-[#202020] mt-5 sm:mt-6">
                <p className="text-xs sm:text-base text-[#E0DCD3] font-serif font-light">
                  Co-Founder & Executive Director
                </p>
                <span className="text-[10px] sm:text-xs text-[#7A7872] block mt-1">
                  Atelier Horloger Directorate
                </span>
              </div>
            </div>

            {/* Second Owner */}
            <div className="bg-[#111111]/90 border border-[#262626] hover:border-[#C7A86B]/60 transition-all duration-300 p-5 sm:p-8 lg:p-10 rounded-sm relative group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 bg-[#C7A86B]/5 rounded-bl-full pointer-events-none group-hover:bg-[#C7A86B]/15 transition-colors" />
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#171717] border border-[#2A2A2A] group-hover:border-[#C7A86B]/50 flex items-center justify-center mb-5 sm:mb-6 transition-colors shadow-inner">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A86B]" />
                </div>
                <span className="text-[11px] sm:text-sm uppercase font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#C7A86B] font-semibold block mb-1.5 sm:mb-2">
                  Second Owner
                </span>
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl text-[#F4F0E8] font-medium tracking-wide mb-2 sm:mb-3 break-words">
                  M.ali khan
                </h3>
              </div>
              <div className="pt-5 sm:pt-6 border-t border-[#202020] mt-5 sm:mt-6">
                <p className="text-xs sm:text-base text-[#E0DCD3] font-serif font-light">
                  Co-Founder & Managing Director
                </p>
                <span className="text-[10px] sm:text-xs text-[#7A7872] block mt-1">
                  Strategic Operations & Atelier Expansion
                </span>
              </div>
            </div>

            {/* Full-Stack Web Developer */}
            <div className="bg-[#111111]/90 border border-[#262626] hover:border-[#C7A86B]/60 transition-all duration-300 p-5 sm:p-8 lg:p-10 rounded-sm relative group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 bg-[#C7A86B]/5 rounded-bl-full pointer-events-none group-hover:bg-[#C7A86B]/15 transition-colors" />
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#171717] border border-[#2A2A2A] group-hover:border-[#C7A86B]/50 flex items-center justify-center mb-5 sm:mb-6 transition-colors shadow-inner">
                  <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A86B]" />
                </div>
                <span className="text-[11px] sm:text-sm uppercase font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#C7A86B] font-semibold block mb-1.5 sm:mb-2">
                  Full-Stack Web Developer
                </span>
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl text-[#F4F0E8] font-medium tracking-wide mb-2 sm:mb-3 break-words">
                  M.awais khaild noorzai
                </h3>
              </div>
              <div className="pt-5 sm:pt-6 border-t border-[#202020] mt-5 sm:mt-6">
                <p className="text-xs sm:text-base text-[#E0DCD3] font-serif font-light">
                  Lead Systems Architect & Engineer
                </p>
                <span className="text-[10px] sm:text-xs text-[#7A7872] block mt-1">
                  Full-Stack Architecture & Next-Gen Interface
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Payment Methods & JazzCash / EasyPaisa Gateway */}
        <div className="mb-10 sm:mb-12 p-4 sm:p-6 lg:p-7 bg-gradient-to-r from-[#170F14] via-[#101411] to-[#0A0A0A] border border-[#C7A86B]/30 rounded-sm flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left w-full lg:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
              <JazzCashLogo size="sm" />
              <EasyPaisaLogo size="sm" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-semibold">
                  JazzCash & EasyPaisa Accepted
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
              </div>
              <p className="text-[11px] sm:text-xs text-[#9C9A94]">
                Direct mobile wallet transfers accepted for timepieces acquisition across Pakistan.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono w-full lg:w-auto">
            <div className="px-3.5 sm:px-4 py-2 bg-[#090A09] border border-[#2A332B] rounded-sm text-center flex-1 sm:flex-none min-w-[140px]">
              <span className="text-[9px] sm:text-[10px] uppercase text-[#8A8E89] block mb-0.5">Account Number</span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wider">03188849935</span>
            </div>
            <div className="px-3.5 sm:px-4 py-2 bg-[#090A09] border border-[#2A332B] rounded-sm text-center flex-1 sm:flex-none min-w-[140px]">
              <span className="text-[9px] sm:text-[10px] uppercase text-[#8A8E89] block mb-0.5">Account Title</span>
              <span className="text-xs sm:text-sm font-serif font-medium text-[#FFDE00]">Saad Tanveer</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-6 sm:pt-8 border-t border-[#141414] flex flex-col md:flex-row items-center justify-between text-[11px] sm:text-xs text-[#666666] gap-4 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} Pak-Premium Watches Ltd. First Owner: <span className="text-[#999999] font-medium">M.suban kasi</span> · Second Owner: <span className="text-[#999999] font-medium">M.ali khan</span>.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span className="text-[#888888]">
              Full-Stack Web Developer: <span className="text-[#C7A86B] font-medium">M.awais khaild noorzai</span>
            </span>
            <span className="hover:text-[#9C9A94] cursor-pointer transition-colors">
              Privacy Discretion
            </span>
            <span className="hover:text-[#9C9A94] cursor-pointer transition-colors">
              Terms of Acquisition
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
