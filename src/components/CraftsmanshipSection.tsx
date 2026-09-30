import React, { useState } from 'react';
import { PenTool, Hammer, Gem, Gauge } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const STEPS = [
    {
      num: '01',
      title: 'Architectural Design',
      subtitle: 'Proportions & Tolerances',
      icon: PenTool,
      desc: 'Every AUREN case profile begins as hand-drawn silhouettes before translation into 3D parametric CAD modeling, ensuring optimal center of gravity on the human wrist.',
      details: 'Over 80 iterations of case curvature and lug downward angles tested across three wrist sizes before final tooling.',
    },
    {
      num: '02',
      title: 'High-Density Metallurgy',
      subtitle: 'Austenitic 904L & 18k Gold',
      icon: Hammer,
      desc: 'We mill our cases exclusively from solid blocks of medical-grade 904L austenitic steel, Grade 5 titanium, or solid 18k Sedna rose gold, delivering extreme resistance to harsh marine salts.',
      details: 'Forged at 1,150°C and cold-stamped under 300 tons of hydraulic pressure to consolidate crystalline metal grain structure.',
    },
    {
      num: '03',
      title: 'Solitary Hand-Finishing',
      subtitle: 'Anglage Main & Perlage',
      icon: Gem,
      desc: 'Our artisans file, chamfer, and specular-polish internal bevels by hand using gentian wood pegs sourced from the Jura mountains coated in micro-fine diamond suspension.',
      details: 'Up to forty hours of meticulous bench work dedicated to a single movement plate before inspection under 40x stereoscopic optics.',
    },
    {
      num: '04',
      title: 'Isochronal Regulation',
      subtitle: '5 Positions & 3 Temperatures',
      icon: Gauge,
      desc: 'Before casing, each balance spring is poising-regulated across five spatial orientations and temperatures ranging from 4°C to 38°C to achieve chronometer precision.',
      details: 'Strict -2 / +4 seconds per day benchmark, certified with individual certificate of chronometry included with every timepiece.',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
            <span className="w-5 h-[1px] bg-[#C7A86B]/60" aria-hidden="true" />
            <span>Four Pillars of Horology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight">
            MADE WITH PATIENCE.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9C9A94] font-light leading-relaxed">
            In an era of mass obsolescence, we build for generations. A mechanical watch is one of the few remaining objects whose soul is forged strictly by the patience of human hands.
          </p>
        </div>

        {/* Desktop Horizontal Step Cards / Mobile Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-7 bg-[#0E0E0E] border rounded-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'border-[#C7A86B] shadow-xl shadow-[#C7A86B]/5 bg-[#121212]'
                    : 'border-[#1C1C1C] hover:border-[#333333]'
                }`}
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xl sm:text-2xl font-light text-[#C7A86B] tracking-wider">
                      {step.num}
                    </span>
                    <div
                      className={`p-2 rounded-sm border transition-colors ${
                        isSelected
                          ? 'border-[#C7A86B]/40 bg-[#C7A86B]/10 text-[#C7A86B]'
                          : 'border-[#222222] text-[#6F6D68] group-hover:text-[#F4F0E8]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Thin Accent Line */}
                  <div
                    className={`h-[1px] mb-6 transition-all duration-500 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#C7A86B] to-transparent w-full'
                        : 'bg-[#222222] w-12 group-hover:w-20'
                    }`}
                  />

                  {/* Titles */}
                  <h3 className="text-lg font-serif text-[#F4F0E8] font-normal mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#C7A86B] mb-4">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#9C9A94] leading-relaxed mb-6 font-light">
                    {step.desc}
                  </p>
                </div>

                {/* Sub details */}
                <div className="pt-4 border-t border-[#1C1C1C] text-[11px] text-[#6F6D68] leading-normal font-sans">
                  {step.details}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
