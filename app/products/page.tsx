'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ShoppingBag, Eye, Check } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RentalDrawer from '@/components/RentalDrawer';

export default function ProductsCatalogPage() {
  const router = useRouter();
  const { products, isLoadingProducts, addToCart, setIsCartOpen } = useStore();
  const { isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Towel', 'Pillow', 'Package'];

  const filteredProducts = products.filter((p) => {
    if (!p.isActive && !isAdmin) return false;
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-16 py-12 lg:py-20">
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-label-caps-sm text-label-caps-sm text-secondary tracking-[0.25em] uppercase block mb-3">
            CURATED COLLECTION
          </span>
          <h1 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-primary font-normal tracking-tight mb-4">
            The TOWLE. Collection
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
            Loomed for slow coastal living. Rent for a single sun-filled day or multiple leisurely afternoons in Bali.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-label-caps-lg tracking-wider border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary-container text-surface border-primary-container shadow-sm'
                  : 'bg-surface-container-lowest border-outline-variant/50 text-on-surface hover:border-primary'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface-container-lowest border border-outline-variant/30 p-6 animate-pulse space-y-4"
              >
                <div className="h-64 bg-surface-container-high"></div>
                <div className="h-4 bg-surface-container-high w-3/4"></div>
                <div className="h-4 bg-surface-container-high w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-outline-variant/50 p-8">
            <p className="text-sm text-on-surface-variant mb-4">
              No products available in this category.
            </p>
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-block px-5 py-2.5 bg-primary-container text-surface text-xs font-label-caps-lg tracking-widest"
              >
                GO TO ADMIN TO ADD PRODUCTS
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-surface-container-lowest border border-outline-variant/40 hover:border-primary transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(29,29,26,0.04)] hover:shadow-lg"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] bg-surface-container-low p-6 overflow-hidden flex items-center justify-center border-b border-outline-variant/30">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-surface/90 border border-outline-variant/40 px-2 py-0.5 text-[10px] font-label-caps-sm text-secondary tracking-widest uppercase">
                      {prod.category}
                    </div>
                    {prod.stock <= 5 && prod.stock > 0 && (
                      <div className="absolute top-3 right-3 bg-error-container/80 text-on-error-container border border-error/30 px-2 py-0.5 text-[9px] font-label-caps-sm tracking-widest uppercase">
                        ONLY {prod.stock} LEFT
                      </div>
                    )}
                    {!prod.isActive && (
                      <div className="absolute top-3 right-3 bg-inverse-surface text-inverse-on-surface px-2 py-0.5 text-[9px] font-label-caps-sm tracking-widest uppercase">
                        DRAFT
                      </div>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <h3 className="font-headline-sm text-lg text-primary font-medium mb-2 group-hover:text-secondary transition-colors">
                      <Link href={`/products/${prod.id}`}>{prod.name}</Link>
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                      {prod.description}
                    </p>

                    {prod.material && (
                      <div className="text-[11px] font-body-sm text-outline flex items-center gap-1.5 mb-2">
                        <span>Textile:</span>
                        <span className="text-on-surface-variant">{prod.material}</span>
                      </div>
                    )}

                    <div className="flex items-baseline gap-2 pt-2 border-t border-outline-variant/20">
                      <span className="font-headline-sm text-xl text-primary font-semibold tabular-nums">
                        Rp{prod.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-on-surface-variant font-light">
                        / daily rental
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/products/${prod.id}`}
                    className="py-3 px-3 text-center border border-outline-variant/60 hover:border-primary text-xs font-label-caps-sm tracking-wider text-primary transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> DETAILS
                  </Link>
                  <button
                    type="button"
                    onClick={() => addToCart(prod, 1)}
                    className="py-3 px-3 text-center bg-primary-container text-surface hover:bg-on-surface-variant text-xs font-label-caps-sm tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> RENT NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer onRentClick={() => setIsCartOpen(true)} onOpenInfoModal={() => {}} />
      <RentalDrawer />
    </div>
  );
}
