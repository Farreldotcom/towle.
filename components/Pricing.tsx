'use client';

import { Check } from 'lucide-react';

interface PricingProps {
  onRentClick: () => void;
}

export default function Pricing({ onRentClick }: PricingProps) {
  return (
    <section className="py-20 lg:py-28 bg-surface" id="pricing">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-label-caps-sm text-label-caps-sm text-on-surface-variant tracking-[0.25em] uppercase block mb-3">
            TRANSPARENT VALUE
          </span>
          <h2 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-primary font-normal tracking-tight mb-4">
            Your Beach Day. Sorted.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            No hidden deposit claims. Clear, honest pricing for effortless relaxation.
          </p>
        </div>

        {/* Elevated Minimal Pricing Card */}
        <div className="max-w-xl mx-auto bg-surface-container-lowest border border-outline-variant/50 p-8 sm:p-12 shadow-[0_16px_40px_-12px_rgba(29,29,26,0.06)] relative transition-all duration-300 hover:shadow-xl">
          <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container font-label-caps-sm text-[10px] py-1.5 px-4 tracking-widest uppercase">
            POPULAR DAILY PASS
          </div>

          <div className="mb-8 border-b border-outline-variant/30 pb-8">
            <span className="font-label-caps-lg text-label-caps-lg text-on-surface-variant block mb-2">
              TOWLE. DAILY RENTAL
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-primary font-normal tabular-nums">
                Rp50.000
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                / DAY
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 font-light">
              Full day access at any partner seaside lounge or hub.
            </p>
          </div>

          {/* Included Checklist */}
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <Check className="text-secondary w-5 h-5 stroke-[2] shrink-0" />
              <span className="font-body-md text-body-md text-on-surface font-light">
                Premium beach towel (sanitized &amp; sealed)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-secondary w-5 h-5 stroke-[2] shrink-0" />
              <span className="font-body-md text-body-md text-on-surface font-light">
                Inflatable ergonomic pillow
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-secondary w-5 h-5 stroke-[2] shrink-0" />
              <span className="font-body-md text-body-md text-on-surface font-light">
                Hidden zipper security pocket
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-secondary w-5 h-5 stroke-[2] shrink-0" />
              <span className="font-body-md text-body-md text-on-surface font-light">
                Full daily rental period (until sunset)
              </span>
            </li>
          </ul>

          <button
            onClick={onRentClick}
            className="w-full py-4 bg-primary-container text-surface font-label-caps-lg text-label-caps-lg hover:bg-on-surface-variant transition-colors duration-200 text-center tracking-widest cursor-pointer shadow-sm active:scale-[0.99]"
            type="button"
          >
            RENT A TOWLE
          </button>

          <div className="mt-4 text-center">
            <span className="text-[11px] font-body-sm text-on-surface-variant/80">
              * Delivery available to Canggu, Seminyak, &amp; Berawa villas (+Rp30.000)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
