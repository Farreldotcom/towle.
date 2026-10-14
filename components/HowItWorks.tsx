'use client';

import { useState } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'RENT',
    label: 'STEP ONE',
    desc: 'Pick up your TOWLE. near the beach from an authorized coastal station or partner lounge.',
    detail: 'Order via our web app or simply tap your phone at any partner seaside lounge or kiosk locker. Pickup takes under 30 seconds.',
  },
  {
    num: '02',
    title: 'INFLATE',
    label: 'STEP TWO',
    desc: 'Set up the inflatable pillow within seconds to your preferred ergonomic height.',
    detail: 'The rapid dual-action air valve takes only 2–3 breaths. Adjust the firmness to support your neck whether reading or sunbathing.',
  },
  {
    num: '03',
    title: 'RELAX',
    label: 'STEP THREE',
    desc: 'Lay back, unwind, and enjoy the beach without neck strain or gear clutter.',
    detail: 'Stow your valuables inside the hidden sand-resistant pocket and stretch out on fast-drying, ultra-plush waffle linen.',
  },
  {
    num: '04',
    title: 'RETURN',
    label: 'STEP FOUR',
    desc: 'Return your TOWLE. when you\'re done. We sanitize, clean, and renew every piece.',
    detail: 'Drop off at any station along the beach or leave with your villa reception for scheduled evening collection. Zero laundry hassles.',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-surface-container-low border-b border-outline-variant/30" id="how-it-works">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <span className="font-label-caps-sm text-label-caps-sm text-on-surface-variant tracking-[0.25em] uppercase block mb-3">
            SEAMLESS EXPERIENCE
          </span>
          <h2 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-primary font-normal tracking-tight mb-4">
            Beach Days, Simplified.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
            Four simple steps from finding TOWLE. to enjoying your beach day.
          </p>
        </div>

        {/* 4-Stage Horizontal Rail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={step.num}
              onClick={() => setActiveStep(activeStep === idx ? null : idx)}
              className={`pt-6 border-t relative flex flex-col justify-between text-center items-center transition-all duration-300 cursor-pointer p-4 ${
                activeStep === idx
                  ? 'border-primary bg-surface/80 shadow-sm'
                  : 'border-outline-variant/50 hover:border-outline'
              }`}
            >
              <div>
                <span className="font-display-lg-mobile text-display-lg-mobile text-secondary font-light block mb-6">
                  {step.num}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-medium tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
                  {step.desc}
                </p>
                {activeStep === idx && (
                  <p className="font-body-sm text-xs text-secondary bg-secondary-container/40 p-2.5 mb-4 text-left border border-secondary/20 animate-in fade-in">
                    {step.detail}
                  </p>
                )}
              </div>
              <span className="font-label-caps-sm text-[10px] text-outline tracking-widest mt-auto">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
