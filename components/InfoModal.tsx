'use client';

import { X } from 'lucide-react';

interface InfoModalProps {
  type: 'terms' | 'privacy' | 'sustainability' | null;
  onClose: () => void;
}

export default function InfoModal({ type, onClose }: InfoModalProps) {
  if (!type) return null;

  const contentMap = {
    terms: {
      category: 'LEGAL & LOGISTICS',
      title: 'Rental Terms & Conditions',
      body: (
        <div className="space-y-4 text-xs font-body-sm text-on-surface-variant leading-relaxed">
          <p>
            <strong>1. Daily Rental Period:</strong> Each TOWLE. rental cycle begins upon pickup or villa delivery and continues until 19:30 PM of the designated rental day. Late evening returns may be deposited into any 24-hour coastal drop chute.
          </p>
          <p>
            <strong>2. Sanitization Guarantee:</strong> Every piece undergoes industrial hot-steam laundering with eco-certified botanical detergents, followed by UV sanitization before being vacuum-sealed for your use.
          </p>
          <p>
            <strong>3. Inflatable Ergonomic Pillow:</strong> The built-in pillow is provided fully inspected and pressure-tested. Please avoid sharp coral contact or dragging over sharp rocks.
          </p>
          <p>
            <strong>4. Hidden Zipper Pocket:</strong> The pocket offers sand protection and discreet concealment for your room keys and smartphone. TOWLE. does not assume liability for left-behind or stolen personal property.
          </p>
          <p>
            <strong>5. Cancellation &amp; Weather Policy:</strong> If heavy rainfall prevents your beach day, you may reschedule your rental voucher to any subsequent day at no additional fee.
          </p>
        </div>
      ),
    },
    privacy: {
      category: 'SECURITY & TRUST',
      title: 'Privacy Policy',
      body: (
        <div className="space-y-4 text-xs font-body-sm text-on-surface-variant leading-relaxed">
          <p>
            <strong>1. Information We Collect:</strong> We collect only necessary details to coordinate your beach locker access or villa delivery (Guest Name, WhatsApp contact, and accommodation name).
          </p>
          <p>
            <strong>2. Zero Tracking:</strong> We do not sell your personal data or track your browsing habits outside our web reservation experience.
          </p>
          <p>
            <strong>3. Payment Security:</strong> All digital transactions and deposit holds are processed through PCI-DSS compliant payment rails in Indonesia.
          </p>
        </div>
      ),
    },
    sustainability: {
      category: 'ENVIRONMENTAL IMPACT',
      title: 'Slow Coastal Living & Sustainability',
      body: (
        <div className="space-y-4 text-xs font-body-sm text-on-surface-variant leading-relaxed">
          <p>
            <strong>Zero Single-Use Waste:</strong> Millions of beach visitors buy cheap, synthetic fast-fashion towels that are abandoned in hotel rooms or landfill after brief holidays. TOWLE. replaces disposable consumption with a circular, closed-loop luxury rental system.
          </p>
          <p>
            <strong>Solar-Powered Laundries:</strong> Our centralized cleaning hub in Denpasar utilizes solar thermal water heating and greywater recycling systems to minimize freshwater draw from Bali&apos;s aquifers.
          </p>
          <p>
            <strong>Organic Long-Staple Linen:</strong> Our towels are loomed from certified non-microplastic organic cotton and flax linen, aging gracefully with every wash cycle.
          </p>
        </div>
      ),
    },
  };

  const item = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-center justify-center">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="relative w-full max-w-xl bg-surface border border-outline-variant/40 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <span className="font-label-caps-sm text-[10px] text-secondary tracking-widest block mb-1">
              {item.category}
            </span>
            <h3 className="font-headline-sm text-lg text-primary font-medium">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 max-h-[60vh] overflow-y-auto pr-2">
          {item.body}
        </div>

        <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-container text-surface font-label-caps-sm text-xs tracking-widest hover:bg-on-surface-variant transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
