'use client';

interface FooterProps {
  onRentClick: () => void;
  onOpenInfoModal: (type: 'terms' | 'privacy' | 'sustainability') => void;
}

export default function Footer({ onRentClick, onOpenInfoModal }: FooterProps) {
  const scrollTo = (id: string) => {
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-primary-container text-surface border-t border-outline-variant/20 transition-colors duration-200 ease-in-out">
      <div className="w-full px-5 md:px-10 lg:px-16 py-16 lg:py-24 max-w-[1440px] mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              className="font-headline-md text-headline-md uppercase tracking-tight text-surface inline-block mb-4"
              href="#"
            >
              TOWLE. <span className="italic font-normal text-secondary-fixed opacity-75">〰</span>
            </a>
            <p className="font-body-sm text-body-sm text-surface/70 max-w-sm font-light leading-relaxed mb-6">
              Make Your Beach Day Better. A quiet luxury rental essential crafted for Bali&apos;s coastlines.
            </p>
            {/* Single stroke wave ornament */}
            <div className="text-surface/30 font-light text-2xl select-none">
              〰〰〰
            </div>
          </div>

          {/* Col 1: SHOP */}
          <div>
            <h4 className="font-label-caps-sm text-label-caps-sm text-surface/50 tracking-widest uppercase mb-4">
              SHOP
            </h4>
            <ul className="space-y-3 font-body-sm text-body-sm">
              <li>
                <button
                  onClick={onRentClick}
                  className="text-surface/80 hover:text-surface transition-colors cursor-pointer text-left"
                >
                  Rent a TOWLE
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#product')}
                  className="text-surface/80 hover:text-surface transition-colors cursor-pointer text-left"
                >
                  The Towel
                </button>
              </li>
              <li>
                <span className="text-surface/40 cursor-default">
                  Gift Sets (Coming)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 2: DISCOVER */}
          <div>
            <h4 className="font-label-caps-sm text-label-caps-sm text-surface/50 tracking-widest uppercase mb-4">
              DISCOVER
            </h4>
            <ul className="space-y-3 font-body-sm text-body-sm">
              <li>
                <button
                  onClick={() => scrollTo('#how-it-works')}
                  className="text-surface/80 hover:text-surface transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#product')}
                  className="text-surface/80 hover:text-surface transition-colors cursor-pointer text-left"
                >
                  Why TOWLE.
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#locations')}
                  className="text-surface/80 hover:text-surface transition-colors cursor-pointer text-left"
                >
                  Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#faq')}
                  className="text-surface/80 hover:text-surface transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: CONNECT */}
          <div>
            <h4 className="font-label-caps-sm text-label-caps-sm text-surface/50 tracking-widest uppercase mb-4">
              CONNECT
            </h4>
            <ul className="space-y-3 font-body-sm text-body-sm">
              <li>
                <a
                  className="text-surface/80 hover:text-surface transition-colors"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="text-surface/80 hover:text-surface transition-colors"
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  className="text-surface/80 hover:text-surface transition-colors"
                  href="mailto:hello@towle.example"
                >
                  hello@towle.example
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-surface/60">
          <p className="text-xs">
            © 2026 TOWLE. All rights reserved. Slow coastal living essentials.
          </p>
          <div className="flex items-center space-x-6 text-xs font-label-caps-sm tracking-wider">
            <button
              onClick={() => onOpenInfoModal('terms')}
              className="hover:text-surface transition-colors cursor-pointer"
            >
              RENTAL TERMS
            </button>
            <button
              onClick={() => onOpenInfoModal('privacy')}
              className="hover:text-surface transition-colors cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            <button
              onClick={() => onOpenInfoModal('sustainability')}
              className="hover:text-surface transition-colors cursor-pointer"
            >
              SUSTAINABILITY
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
