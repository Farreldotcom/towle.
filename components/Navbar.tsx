'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, User, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAdmin, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (pathname === '/') {
        const elem = document.querySelector(href);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/' + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_16px_40px_-12px_rgba(29,29,26,0.06)] transition-all duration-300 ease-out">
      <div className="grid grid-cols-3 items-center w-full px-5 md:px-10 lg:px-16 h-20 max-w-[1440px] mx-auto">
        {/* Left: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7">
          <Link
            href="/products"
            className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            CATALOG
          </Link>
          <button
            onClick={() => handleNavClick('#how-it-works')}
            className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            HOW IT WORKS
          </button>
          <button
            onClick={() => handleNavClick('#locations')}
            className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            LOCATIONS
          </button>
          <button
            onClick={() => handleNavClick('#faq')}
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
          <Link
            className="font-headline-lg text-headline-lg tracking-tight uppercase text-primary font-normal inline-block hover:opacity-90 transition-opacity"
            href="/"
          >
            TOWLE.
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end space-x-5 lg:space-x-6">
          {onOpenSearch && (
            <button
              aria-label="Search"
              onClick={onOpenSearch}
              className="text-primary hover:text-secondary transition-colors duration-200 flex items-center p-1 cursor-pointer"
              type="button"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}

          {/* User Account / Admin Badge */}
          {user ? (
            <div className="flex items-center space-x-3">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary-container text-on-secondary-container font-label-caps-sm text-[10px] tracking-wider border border-secondary/30"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ADMIN
                </Link>
              )}
              <Link
                href="/account"
                aria-label="Account"
                className="text-primary hover:text-secondary transition-colors duration-200 flex items-center p-1"
                title={profile?.displayName || 'My Account'}
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </Link>
              <button
                onClick={() => logout()}
                aria-label="Log Out"
                title="Log Out"
                className="text-on-surface-variant hover:text-error transition-colors p-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="font-label-caps-lg text-label-caps-lg text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              SIGN IN
            </Link>
          )}

          {/* Shopping Bag */}
          <button
            aria-label="Shopping Bag"
            onClick={() => setIsCartOpen(true)}
            className="text-primary hover:text-secondary transition-colors duration-200 flex items-center relative p-1 cursor-pointer"
            type="button"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1.5 bg-secondary text-surface text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body-sm font-semibold">
              {cartCount}
            </span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => setIsCartOpen(true)}
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
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              CATALOG
            </Link>
            <button
              onClick={() => handleNavClick('#how-it-works')}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => handleNavClick('#locations')}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              LOCATIONS
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="text-left py-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              FAQ
            </button>

            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-2 text-primary font-semibold border-t border-outline-variant/20 pt-3"
                >
                  MY ACCOUNT ({profile?.displayName || 'User'})
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-left py-2 text-secondary font-semibold"
                  >
                    ADMIN DASHBOARD
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-left py-2 text-error"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left py-2 text-primary font-semibold border-t border-outline-variant/20 pt-3"
              >
                SIGN IN / REGISTER
              </Link>
            )}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
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
