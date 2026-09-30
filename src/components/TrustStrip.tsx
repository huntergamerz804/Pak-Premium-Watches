import React from 'react';
import { Compass, Sparkles, Award, Globe } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const TRUST_ITEMS = [
    {
      icon: Compass,
      title: 'Precision Mechanical Calibres',
      desc: 'In-house regulated to COSC chronometer tolerances',
    },
    {
      icon: Sparkles,
      title: '904L Steel & Precious Alloys',
      desc: 'Surgical austenitic metallurgy & solid 18k gold',
    },
    {
      icon: Award,
      title: 'Hand-Finished in Geneva',
      desc: 'Anglage, Côtes de Genève, and perlage applied by hand',
    },
    {
      icon: Globe,
      title: '5-Year Atelier Warranty',
      desc: 'Complimentary international insured servicing',
    },
  ];

  return (
    <section className="bg-[#0C0C0C] border-y border-[#1C1C1C] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-2 transition-colors group"
              >
                <div className="p-2.5 bg-[#141414] border border-[#222222] group-hover:border-[#C7A86B]/40 rounded-sm shrink-0 transition-colors">
                  <Icon className="w-4 h-4 text-[#C7A86B]" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-[#F4F0E8] font-sans mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9C9A94] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
