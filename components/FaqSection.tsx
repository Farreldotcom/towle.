'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What is TOWLE.?',
    a: 'TOWLE. is a beach towel rental service designed to make your beach day more comfortable and convenient with an all-in-one ergonomic textile system.',
  },
  {
    q: 'How much does it cost?',
    a: 'Our daily rental is planned at approximately Rp50.000 per towel, giving you uninterrupted comfort for the whole day.',
  },
  {
    q: 'What comes with a TOWLE.?',
    a: 'Each rental includes the multifunctional beach towel, the ergonomic inflatable pillow, and a hidden zipper pocket for small valuables.',
  },
  {
    q: 'Can I use TOWLE. for the whole day?',
    a: 'Yes. The rental concept is based on a daily rental period, allowing you to use it from morning surf sessions through to sunset cocktails.',
  },
  {
    q: 'Where can I rent TOWLE.?',
    a: 'TOWLE. is initially planned for popular beach destinations in Bali. Availability and locations will be announced as the service launches.',
  },
  {
    q: 'Is the pocket anti-theft?',
    a: 'The pocket is designed as a discreet place to keep your essentials close and shielded from wind or casual glance. It should not be presented as a guarantee against theft.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-surface-container-low border-t border-outline-variant/30" id="faq">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <span className="font-label-caps-sm text-label-caps-sm text-on-surface-variant tracking-[0.25em] uppercase block mb-3">
            COMMON INQUIRIES
          </span>
          <h2 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-primary font-normal tracking-tight">
            Frequently Asked Questions.
          </h2>
        </div>

        <div className="max-w-3xl border-t border-outline-variant/40 mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="border-b border-outline-variant/40 py-6 transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center text-left font-headline-sm text-lg text-primary font-medium cursor-pointer group"
                >
                  <span className="group-hover:text-secondary transition-colors pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`transition-transform duration-300 text-on-surface-variant shrink-0 ${
                      isOpen ? 'rotate-45 text-primary' : ''
                    }`}
                  >
                    <Plus className="w-5 h-5 stroke-[1.5]" />
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed pr-8 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
