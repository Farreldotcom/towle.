'use client';

import { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenSearch: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenCart, onOpenSearch, cartCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_16px_40px_-12px_rgba(29,29,26,0.06)] transition-all duration-300 ease-out">
      <div className="grid grid-cols-3 items-center w-full px-5 md:px-10 lg:px-16 h-20 max-w-[1440px] mx-auto">
        {/* Left: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollTo('#product')}
            className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            SHOP
          </button>
          <button
            onClick={() => scrollTo('#how-it-works')}
            className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            HOW IT WORKS
          </button>
          <button
            onClick={() => scrollTo('#locations')}
            className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            LOCATIONS
          </button>
          <button
            onClick={() => scrollTo('#faq')}
            className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center">
          <button
            aria-label="Toggle Menu"
            className="text-primary p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Center: Brand Logo */}
        <div className="text-center">
          <a
            className="font-headline-lg text-headline-lg tracking-tight uppercase text-primary font-normal inline-block hover:opacity-90 transition-opacity"
            href="#"
          >
            TOWLE.
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end space-x-6">
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="text-primary hover:text-secondary transition-colors duration-200 flex items-center p-1 cursor-pointer"
            type="button"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button
            aria-label="Shopping Bag"
            onClick={onOpenCart}
            className="text-primary hover:text-secondary transition-colors duration-200 flex items-center relative p-1 cursor-pointer"
            type="button"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1.5 bg-secondary text-surface text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body-sm font-semibold">
              {cartCount}
            </span>
          </button>
          <button
            onClick={onOpenCart}
            className="hidden sm:inline-block font-label-caps-lg text-label-caps-lg px-5 py-2.5 bg-primary-container text-surface hover:bg-on-surface-variant transition-colors duration-200 cursor-pointer tracking-widest"
            type="button"
          >
            RENT A TOWLE
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 font-label-caps-lg">
            <button
              onClick={() => scrollTo('#product')}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              SHOP
            </button>
            <button
              onClick={() => scrollTo('#how-it-works')}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => scrollTo('#locations')}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              LOCATIONS
            </button>
            <button
              onClick={() => scrollTo('#faq')}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3 bg-primary-container text-surface font-label-caps-lg text-center tracking-widest"
              >
                RENT A TOWLE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
