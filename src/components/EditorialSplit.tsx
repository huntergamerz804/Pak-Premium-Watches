import React, { useState } from 'react';
import { macroMovementImg } from '../data/products';
import { Check, Cpu, Sparkles, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const EditorialSplit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'finishing' | 'isochronism'>('architecture');
  const { openConcierge } = useCart();

  const TAB_CONTENT = {
    architecture: {
      title: 'Proprietary Calibre Architecture',
      desc: 'Engineered entirely in Geneva, our twin-barrel systems distribute unvarying torque across the entire 72-hour reserve, eliminating amplitude drops at low power.',
      points: [
        'Twin series barrels with Nivaflex mainsprings',
        'Open-worked bridges optimized for structural rigidity',
        '28,800 vph variable-inertia balance with gold regulation blocks',
      ],
    },
    finishing: {
      title: 'Hand-Executed Haute Horlogerie Finishing',
      desc: 'Each bridge receives forty hours of hand-executed Anglage Main, polished with gentian wood pegs and diamond paste to an optical mirror gleam.',
      points: [
        'Hand-beveled 45° internal and external angles',
        'Traditional Côtes de Genève linear wave engraving',
        'Perlage circular graining on underlying mainplates',
      ],
    },
    isochronism: {
      title: 'Five-Position Thermal Regulation',
      desc: 'Every assembled movement undergoes rigorous chronometric testing across five spatial orientations and three temperature variances (-2/+4 sec/day).',
      points: [
        'COSC chronometer certified precision benchmarks',
        'Glucydur anti-magnetic balance wheel',
        'Overcoil Breguet hairspring for concentric breathing',
      ],
    },
  };

  return (
    <section id="movement" className="py-24 sm:py-32 bg-[#050505] text-[#F4F0E8] relative overflow-hidden">
      {/* Background Accent Lines */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[#C7A86B]/5 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Macro Movement Photography (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#222222] bg-[#0E0E0E] shadow-2xl shadow-black">
              <img
                src={macroMovementImg}
                alt="Macro close-up of Swiss-crafted AUREN mechanical watch movement with bevelled bridges and balance wheel"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Cinematic Vignette */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-black/30 pointer-events-none"
                aria-hidden="true"
              />

              {/* Lower Badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
                <span className="font-mono text-[11px] text-[#C7A86B] tracking-widest uppercase bg-[#080808]/90 px-3 py-1.5 border border-[#C7A86B]/30 rounded-sm backdrop-blur-sm">
                  Calibre AR-08 · Exposed Architecture
                </span>
                <span className="text-[11px] text-[#9C9A94] font-mono hidden sm:inline">
                  27 Rubies · 3 Hz
                </span>
              </div>
            </div>

            {/* Subtle decorative gold line */}
            <div className="absolute -bottom-4 -left-4 w-32 h-1 bg-gradient-to-r from-[#C7A86B] to-transparent hidden sm:block" />
          </div>

          {/* Right Column: Editorial Copy & Interactive Tab (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#C7A86B]/60" aria-hidden="true" />
              <span>The Art Within</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F4F0E8] font-normal leading-[1.1] tracking-tight mb-6">
              PRECISION YOU CAN SEE.
            </h2>

            {/* Body */}
            <p className="text-sm sm:text-base text-[#9C9A94] font-light leading-relaxed mb-8">
              A mechanical movement is not merely a mechanism—it is a miniature cathedral of kinetic physics. Every gear tooth, ruby bearing, and bevelled edge represents weeks of human mastery dedicated to conquering gravity.
            </p>

            {/* Interactive Tabs */}
            <div className="flex border-b border-[#222222] mb-6">
              {(['architecture', 'finishing', 'isochronism'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 px-3 text-xs tracking-wider uppercase font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-[#C7A86B]'
                      : 'text-[#6F6D68] hover:text-[#E8E5DE]'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A86B]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Details */}
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] p-6 rounded-sm mb-8 transition-all">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F4F0E8] mb-2 font-sans">
                {TAB_CONTENT[activeTab].title}
              </h3>
              <p className="text-xs text-[#9C9A94] leading-relaxed mb-4">
                {TAB_CONTENT[activeTab].desc}
              </p>
              <ul className="space-y-2">
                {TAB_CONTENT[activeTab].points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#E8E5DE]">
                    <Check className="w-3.5 h-3.5 text-[#C7A86B] shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={openConcierge}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-[#C7A86B] hover:bg-[#C7A86B] text-[#C7A86B] hover:text-[#080808] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 rounded-sm"
              >
                <span>Consult Our Master Horologist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
