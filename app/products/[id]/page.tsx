'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, ShieldCheck, ShoppingBag, Clock, Waves } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RentalDrawer from '@/components/RentalDrawer';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, isLoadingProducts, addToCart, setIsCartOpen } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === resolvedParams.id);

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center font-body-sm text-sm text-on-surface-variant animate-pulse">
            Loading TOWLE product details...
          </div>
        </main>
        <Footer onRentClick={() => setIsCartOpen(true)} onOpenInfoModal={() => {}} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-4">
          <h1 className="font-headline-lg text-2xl text-primary">Product Not Found</h1>
          <p className="font-body-sm text-on-surface-variant">
            The requested towel or beach accessory could not be found in our current catalog.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-primary-container text-surface font-label-caps-lg tracking-widest"
          >
            BACK TO CATALOG
          </Link>
        </main>
        <Footer onRentClick={() => setIsCartOpen(true)} onOpenInfoModal={() => {}} />
      </div>
    );
  }

  const handleInstantRent = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-16 py-10 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="font-body-sm text-xs text-on-surface-variant hover:text-primary inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Collection
          </Link>
        </div>

        {/* 2-Column Contiguous Product Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant/40 p-8 sm:p-12 text-center relative shadow-[0_4px_20px_-4px_rgba(29,29,26,0.04)]">
            <div className="aspect-[4/3] flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-[500px] w-auto object-contain filter contrast-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-6 flex justify-between items-center text-xs font-label-caps-sm text-outline tracking-widest border-t border-outline-variant/30 pt-4">
              <span>EST. BALI 2026</span>
              <span className="text-secondary">{product.category.toUpperCase()}</span>
              <span>ORGANIC LINEN</span>
            </div>
          </div>

          {/* Right Column: Sticky Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/50 p-8 sm:p-10 shadow-[0_16px_40px_-12px_rgba(29,29,26,0.06)] space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 bg-secondary-container/70 text-on-secondary-container font-label-caps-sm text-[10px] tracking-widest uppercase mb-3">
                {product.category}
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl text-primary font-normal tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-2 pb-4 border-b border-outline-variant/30">
                <span className="font-display-lg text-3xl text-primary font-normal tabular-nums">
                  Rp{product.price.toLocaleString('id-ID')}
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">/ day rental</span>
              </div>
            </div>

            <p className="font-body-sm text-sm text-on-surface-variant font-light leading-relaxed">
              {product.description}
            </p>

            {/* Specifications List */}
            <div className="space-y-2 py-4 border-y border-outline-variant/20 text-xs font-body-sm">
              {product.material && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Textile Material:</span>
                  <span className="font-medium text-primary">{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Dimensions:</span>
                  <span className="font-medium text-primary">{product.dimensions}</span>
                </div>
              )}
              {product.color && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Color Palette:</span>
                  <span className="font-medium text-primary">{product.color}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Availability:</span>
                <span className="font-medium text-secondary">
                  {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider">
                  RENTAL QUANTITY
                </span>
                <div className="flex items-center border border-outline-variant/50 bg-surface">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-medium hover:bg-surface-variant transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-medium hover:bg-surface-variant transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleInstantRent}
                  className="w-full py-4 bg-primary-container text-surface font-label-caps-lg text-label-caps-lg tracking-widest hover:bg-on-surface-variant transition-colors cursor-pointer shadow-sm text-center"
                >
                  RENT NOW — Rp{(product.price * quantity).toLocaleString('id-ID')}
                </button>
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity)}
                  className="w-full py-3.5 border border-outline-variant/60 text-primary font-label-caps-lg text-label-caps-lg tracking-widest hover:bg-surface-variant transition-colors cursor-pointer text-center"
                >
                  ADD TO RENTAL BAG
                </button>
              </div>
            </div>

            {/* Reassurance notes */}
            <div className="pt-4 border-t border-outline-variant/20 space-y-2 text-xs font-body-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-secondary shrink-0" />
                <span>Sanitized with organic botanical steam before every rental</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <span>Valid until sunset (19:30 PM) across all Bali kiosks</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                <span>Discreet zipper pocket protects room keys &amp; smartphone</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onRentClick={() => setIsCartOpen(true)} onOpenInfoModal={() => {}} />
      <RentalDrawer />
    </div>
  );
}
