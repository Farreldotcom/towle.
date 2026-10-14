'use client';

import { useState } from 'react';
import { Search, X, ArrowRight, MapPin, Sparkles, HelpCircle } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (target: string) => void;
}

const SEARCH_ITEMS = [
  {
    title: 'Inflatable Ergonomic Pillow',
    category: 'Product Feature',
    snippet: 'Built-in pocket holding rapid-inflation pillow for neck support',
    target: '#product',
  },
  {
    title: 'Premium Waffle Linen Towel',
    category: 'Textile',
    snippet: 'Sand-resistant, fast-drying lightweight weave',
    target: '#product',
  },
  {
    title: 'Concealed Zipper Security Pocket',
    category: 'Feature',
    snippet: 'Discreet sand-sealed pocket for keys, cards, and phone',
    target: '#product',
  },
  {
    title: 'Canggu Batu Bolong Kiosk',
    category: 'Location',
    snippet: 'Seaside lockers near The Lawn & Batu Bolong surf break',
    target: '#locations',
  },
  {
    title: 'Berawa Echo Beach Station',
    category: 'Location',
    snippet: 'Lifeguard adjacent pickup kiosk in Berawa',
    target: '#locations',
  },
  {
    title: 'Seminyak Petitenget Pavilion',
    category: 'Location',
    snippet: 'Promenade lockers open 7:30 AM to 8:00 PM',
    target: '#locations',
  },
  {
    title: 'Daily Rental Pricing (Rp50.000)',
    category: 'Pricing',
    snippet: 'Full daily access with sanitized towel and inflatable pillow',
    target: '#pricing',
  },
  {
    title: 'Villa Delivery (+Rp30.000)',
    category: 'Delivery',
    snippet: 'Direct morning drop-off to Canggu, Seminyak, & Berawa villas',
    target: '#pricing',
  },
  {
    title: 'How It Works (4 Steps)',
    category: 'Guide',
    snippet: 'Rent, Inflate, Relax, Return seamless routine',
    target: '#how-it-works',
  },
  {
    title: 'Can I keep it for sunset cocktails?',
    category: 'FAQ',
    snippet: 'Yes, all rentals extend until after sunset at 19:00 PM',
    target: '#faq',
  },
];

export default function SearchModal({ isOpen, onClose, onSelectAction }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="relative w-full max-w-2xl bg-surface border border-outline-variant/40 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Input Bar */}
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-secondary shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search features, Bali beach locations, FAQs..."
              className="w-full bg-transparent text-sm sm:text-base font-body-md text-primary focus:outline-none placeholder:text-on-surface-variant/60"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div className="text-[10px] font-label-caps-sm text-on-surface-variant tracking-widest uppercase mb-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Popular Destinations & Queries'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant text-sm">
              No results found for &ldquo;{query}&rdquo;. Try &ldquo;pillow&rdquo;, &ldquo;canggu&rdquo;, or &ldquo;pricing&rdquo;.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.title}
                onClick={() => {
                  onSelectAction(item.target);
                  onClose();
                }}
                className="p-3.5 bg-surface-container-lowest hover:bg-surface-variant/50 border border-outline-variant/30 hover:border-primary transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-caps-sm text-[10px] text-secondary">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-sm text-primary font-medium group-hover:text-secondary transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    {item.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary transition-transform group-hover:translate-x-1 shrink-0 ml-4" />
              </div>
            ))
          )}
        </div>

        {/* Quick shortcut pills */}
        <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex gap-2">
            <button
              onClick={() => setQuery('Canggu')}
              className="px-2 py-1 bg-surface-container-low border border-outline-variant/30 hover:border-primary text-[11px]"
            >
              Canggu
            </button>
            <button
              onClick={() => setQuery('Pillow')}
              className="px-2 py-1 bg-surface-container-low border border-outline-variant/30 hover:border-primary text-[11px]"
            >
              Pillow
            </button>
            <button
              onClick={() => setQuery('Pricing')}
              className="px-2 py-1 bg-surface-container-low border border-outline-variant/30 hover:border-primary text-[11px]"
            >
              Pricing
            </button>
          </div>
          <span className="text-[10px] font-label-caps-sm text-outline">ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
