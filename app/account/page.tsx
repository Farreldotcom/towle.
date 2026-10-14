'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, MapPin, Phone, ShieldCheck, LogOut, Check, Clock, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AccountPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isLoading, updateUserProfile, logout } = useAuth();
  const { myOrders, isLoadingOrders } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-sm font-body-sm text-on-surface-variant animate-pulse">
            Verifying customer credentials...
          </div>
        </main>
        <Footer onRentClick={() => {}} onOpenInfoModal={() => {}} />
      </div>
    );
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateUserProfile({
        displayName,
        phoneNumber,
        address,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-16 py-12 lg:py-20">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-outline-variant/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-label-caps-sm text-[11px] text-secondary tracking-widest uppercase">
                GUEST PROFILE
              </span>
              {isAdmin && (
                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-caps-sm text-[10px] tracking-wider border border-secondary/30">
                  ADMINISTRATOR
                </span>
              )}
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-primary font-normal">
              Welcome, {profile?.displayName || user.email}
            </h1>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1 font-light">
              Connected via {user.email} · Account Role: <strong className="capitalize">{profile?.role || 'Customer'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-5 py-2.5 bg-secondary text-surface text-xs font-label-caps-sm tracking-widest hover:bg-on-secondary-container transition-colors inline-flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> ADMIN DASHBOARD
              </Link>
            )}
            <button
              onClick={() => logout()}
              className="px-4 py-2.5 border border-outline-variant/50 text-xs font-label-caps-sm tracking-widest text-on-surface hover:text-error hover:border-error transition-colors inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> SIGN OUT
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-outline-variant/30 mb-8 space-x-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 font-label-caps-lg text-xs tracking-wider transition-colors border-b-2 -mb-[1px] cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <Package className="w-4 h-4" /> MY RENTALS ({myOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 font-label-caps-lg text-xs tracking-wider transition-colors border-b-2 -mb-[1px] cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <User className="w-4 h-4" /> PROFILE &amp; VILLA DETAILS
          </button>
        </div>

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {isLoadingOrders ? (
              <div className="p-8 text-center text-xs font-body-sm text-on-surface-variant animate-pulse">
                Loading your beach passes...
              </div>
            ) : myOrders.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-outline-variant/50 p-8 bg-surface-container-lowest">
                <Package className="w-10 h-10 text-outline mx-auto mb-3" />
                <h3 className="font-headline-sm text-base text-primary mb-1">
                  No Active or Previous Rentals
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant max-w-sm mx-auto mb-6">
                  You haven&apos;t reserved any TOWLE. beach passes yet. Explore our collection for your next beach afternoon.
                </p>
                <Link
                  href="/products"
                  className="inline-block px-6 py-3 bg-primary-container text-surface font-label-caps-lg text-xs tracking-widest"
                >
                  EXPLORE TOWELS &amp; RENT
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-surface-container-lowest border border-outline-variant/40 p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between border-b border-outline-variant/20 pb-3">
                      <div>
                        <span className="font-label-caps-sm text-[10px] text-secondary tracking-widest block">
                          PASS NUMBER
                        </span>
                        <h4 className="font-headline-sm text-lg text-primary font-medium">
                          {order.orderNumber}
                        </h4>
                        <span className="text-[11px] font-body-sm text-on-surface-variant">
                          Reserved on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-block px-2.5 py-1 text-[10px] font-label-caps-sm tracking-wider uppercase border ${
                            order.orderStatus === 'confirmed'
                              ? 'bg-secondary-container text-on-secondary-container border-secondary/30'
                              : order.orderStatus === 'active'
                              ? 'bg-primary-container text-surface border-primary'
                              : order.orderStatus === 'returned'
                              ? 'bg-surface-container text-outline border-outline-variant/40'
                              : 'bg-error-container text-on-error-container border-error/20'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>

                    {/* Order metadata */}
                    <div className="grid grid-cols-2 gap-3 text-xs font-body-sm bg-surface-container-low p-3 border border-outline-variant/20">
                      <div>
                        <span className="text-on-surface-variant text-[11px] block">Beach Hub:</span>
                        <span className="font-medium text-primary">{order.location} Beach</span>
                      </div>
                      <div>
                        <span className="text-on-surface-variant text-[11px] block">Collection:</span>
                        <span className="font-medium text-primary uppercase">{order.deliveryType}</span>
                      </div>
                      <div>
                        <span className="text-on-surface-variant text-[11px] block">Rental Period:</span>
                        <span className="font-medium text-primary">{order.rentalDate}</span>
                      </div>
                      <div>
                        <span className="text-on-surface-variant text-[11px] block">Payment:</span>
                        <span className="font-medium text-secondary uppercase">{order.paymentStatus}</span>
                      </div>
                    </div>

                    {/* Item list */}
                    <div className="space-y-1.5 text-xs font-body-sm">
                      <span className="text-[11px] font-label-caps-sm text-outline tracking-wider block">
                        ITEMS IN THIS RENTAL:
                      </span>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-on-surface">
                          <span>
                            {it.name} <strong className="text-primary">× {it.quantity}</strong>
                          </span>
                          <span className="tabular-nums">
                            Rp{(it.price * it.quantity).toLocaleString('id-ID')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-sm">
                      <span className="font-headline-sm text-primary">Total Amount:</span>
                      <span className="font-headline-sm text-lg font-semibold text-primary tabular-nums">
                        Rp{order.totalAmount.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Barcode representation for kiosk scanner */}
                    <div className="p-2 bg-surface-container border border-dashed border-outline-variant/40 text-center">
                      <div className="h-6 flex items-center justify-center space-x-1 opacity-75">
                        <span className="w-1 h-full bg-primary"></span>
                        <span className="w-2 h-full bg-primary"></span>
                        <span className="w-0.5 h-full bg-primary"></span>
                        <span className="w-1.5 h-full bg-primary"></span>
                        <span className="w-2 h-full bg-primary"></span>
                        <span className="w-0.5 h-full bg-primary"></span>
                        <span className="w-1.5 h-full bg-primary"></span>
                      </div>
                      <span className="text-[9px] font-mono text-on-surface-variant tracking-wider mt-1 block">
                        TAP OR SHOW AT BEACHFRONT LOCKER
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="max-w-xl bg-surface-container-lowest border border-outline-variant/40 p-8 sm:p-10 shadow-sm">
            <h3 className="font-headline-sm text-lg text-primary font-medium mb-2">
              Guest Information
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant mb-6 font-light">
              Keep your contact and Bali villa address updated for fast morning drop-offs.
            </p>

            {saveSuccess && (
              <div className="mb-6 p-3 bg-secondary-container/50 border border-secondary/30 text-on-secondary-container text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-secondary" />
                Profile details saved successfully.
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full p-3 bg-surface border border-outline-variant/50 text-sm font-body-md text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider uppercase mb-1.5">
                  Email Address (Linked to Firebase Auth)
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email || ''}
                  className="w-full p-3 bg-surface-container-high border border-outline-variant/30 text-sm font-body-md text-on-surface-variant/70 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider uppercase mb-1.5">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+62 812 3456 7890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 bg-surface border border-outline-variant/50 text-sm font-body-md text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider uppercase mb-1.5">
                  Default Villa Name / Address (Bali)
                </label>
                <textarea
                  rows={3}
                  placeholder="Villa Seminyak Sanctuary, Jl. Kayu Aya No. 8"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-surface border border-outline-variant/50 text-sm font-body-md text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-primary-container text-surface font-label-caps-lg text-xs tracking-widest hover:bg-on-surface-variant transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer onRentClick={() => router.push('/products')} onOpenInfoModal={() => {}} />
    </div>
  );
}
