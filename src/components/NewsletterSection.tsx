import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid private correspondence email.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0A] border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C7A86B] font-medium mb-3">
          <span className="w-5 h-[1px] bg-[#C7A86B]" aria-hidden="true" />
          <span>Private Correspondence</span>
          <span className="w-5 h-[1px] bg-[#C7A86B]" aria-hidden="true" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#F4F0E8] font-normal tracking-tight mb-4">
          ENTER THE WORLD OF AUREN.
        </h2>

        <p className="text-sm sm:text-base text-[#9C9A94] max-w-xl mx-auto font-light leading-relaxed mb-10">
          Receive confidential notifications of new calibre debuts, horological essays from our Geneva benches, and private preview invitations.
        </p>

        {isSubmitted ? (
          <div className="p-8 bg-[#111111] border border-[#C7A86B]/40 max-w-lg mx-auto rounded-sm flex flex-col items-center justify-center animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-[#C7A86B] mb-3" />
            <h3 className="font-serif text-xl text-[#F4F0E8] mb-1">
              Welcome to the AUREN Guild.
            </h3>
            <p className="text-xs text-[#9C9A94] leading-relaxed">
              Your correspondence address has been inscribed into our private register. A formal welcoming dispatch has been prepared.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Your email address"
                  className="w-full bg-[#121212] border border-[#262626] focus:border-[#C7A86B] text-sm text-[#F4F0E8] px-4 py-3.5 rounded-sm placeholder-[#555555] focus:outline-none transition-colors"
                  aria-label="Email address for private journal"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-[#C7A86B] hover:bg-[#D8BC82] text-[#080808] font-semibold text-xs tracking-[0.18em] uppercase transition-colors rounded-sm flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-[#C7A86B]/10"
              >
                <span>Join The Journal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {error && (
              <p className="text-xs text-[#E57373] mt-2 text-left font-mono">
                {error}
              </p>
            )}

            <p className="text-[11px] text-[#555555] mt-4 font-light">
              We respect your discretion. You may withdraw correspondence at any moment. Zero promotional solicitations.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
