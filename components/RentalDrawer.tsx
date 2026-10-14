'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Check, ShieldCheck, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';

interface RentalDrawerProps {
  initialLocation?: string;
}

export default function RentalDrawer({ initialLocation = 'CANGGU' }: RentalDrawerProps) {
  const { user, profile } = useAuth();
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    products,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    createOrder,
  } = useStore();

  const [deliveryType, setDeliveryType] = useState<'kiosk' | 'villa'>('kiosk');
  const [selectedBeach, setSelectedBeach] = useState(initialLocation);
  const [dateChoice, setDateChoice] = useState('Today (Until Sunset 19:30)');
  const [guestName, setGuestName] = useState(profile?.displayName || '');
  const [guestEmail, setGuestEmail] = useState(profile?.email || user?.email || '');
  const [guestPhone, setGuestPhone] = useState(profile?.phoneNumber || '');
  const [villaAddress, setVillaAddress] = useState(profile?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCartOpen) return null;

  const deliveryFee = deliveryType === 'villa' ? 30000 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Your rental bag is empty. Please select a towel to rent.');
      return;
    }

    if (!guestName || !guestPhone) {
      setErrorMessage('Please fill in your contact name and WhatsApp phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const orderNumber = await createOrder({
        userId: user ? user.uid : 'guest-user',
        guestName,
        guestEmail: guestEmail || (user?.email ?? ''),
        guestPhone,
        items: orderItems,
        deliveryType,
        location: selectedBeach,
        villaAddress: deliveryType === 'villa' ? villaAddress : undefined,
        rentalDate: dateChoice,
        subtotal: cartTotal,
        deliveryFee,
        totalAmount: grandTotal,
        orderStatus: 'confirmed',
        paymentStatus: 'unpaid',
      });

      setConfirmedOrderNumber(orderNumber);
    } catch (err: unknown) {
      console.error('Order creation error:', err);
      setErrorMessage('Failed to place order. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDefaultTowel = () => {
    const towel = products.find((p) => p.category === 'Towel') || products[0];
    if (towel) {
      addToCart(towel, 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setConfirmedOrderNumber(null);
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface text-on-surface border-l border-outline-variant/30 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface">
            <div>
              <span className="font-label-caps-sm text-[10px] text-secondary tracking-widest uppercase block">
                {confirmedOrderNumber ? 'RESERVATION CONFIRMED' : 'BEACH ESSENTIALS BAG'}
              </span>
              <h2 className="font-headline-sm text-lg text-primary font-medium">
                {confirmedOrderNumber ? 'Your TOWLE. Pass' : 'Rent a TOWLE.'}
              </h2>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setConfirmedOrderNumber(null);
              }}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {confirmedOrderNumber ? (
              /* Success / Voucher Screen */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-6 bg-surface-container-lowest border-2 border-primary-container text-center relative shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary-container/60 text-secondary mx-auto flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="font-label-caps-sm text-[10px] tracking-widest text-secondary block mb-1">
                    BEACH PASS CONFIRMED
                  </span>
                  <h3 className="font-display-lg text-2xl text-primary font-normal mb-2">
                    {confirmedOrderNumber}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Show this pass number or tap at {selectedBeach} beach locker.
                  </p>

                  {/* Barcode representation */}
                  <div className="my-6 p-3 bg-surface-container border border-dashed border-outline-variant/50">
                    <div className="h-10 flex items-center justify-center space-x-1">
                      <span className="w-1 h-full bg-primary"></span>
                      <span className="w-2 h-full bg-primary"></span>
                      <span className="w-0.5 h-full bg-primary"></span>
                      <span className="w-3 h-full bg-primary"></span>
                      <span className="w-1.5 h-full bg-primary"></span>
                      <span className="w-0.5 h-full bg-primary"></span>
                      <span className="w-2 h-full bg-primary"></span>
                      <span className="w-1 h-full bg-primary"></span>
                      <span className="w-2.5 h-full bg-primary"></span>
                      <span className="w-0.5 h-full bg-primary"></span>
                      <span className="w-1.5 h-full bg-primary"></span>
                      <span className="w-2 h-full bg-primary"></span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-on-surface-variant block mt-1">
                      {confirmedOrderNumber}
                    </span>
                  </div>

                  <div className="space-y-2 text-left text-xs bg-surface-container-low p-3.5 border border-outline-variant/30 font-body-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Guest:</span>
                      <span className="font-medium">{guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Hub:</span>
                      <span className="font-medium">{selectedBeach} Beach</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Collection:</span>
                      <span className="font-medium uppercase">{deliveryType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Total:</span>
                      <span className="font-semibold tabular-nums">
                        Rp{grandTotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary-container/30 border border-secondary/20 text-xs text-on-secondary-container flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Sanitized &amp; Sealed in Bali</p>
                    <p className="text-[11px] opacity-85 mt-0.5">
                      Your order has been saved to the database. You can track this order in your customer account.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/account"
                    onClick={() => {
                      setIsCartOpen(false);
                      setConfirmedOrderNumber(null);
                    }}
                    className="w-full py-3 bg-primary-container text-surface font-label-caps-lg text-center tracking-widest block hover:bg-on-surface-variant transition-colors"
                  >
                    VIEW IN MY ACCOUNT
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setConfirmedOrderNumber(null);
                    }}
                    className="w-full py-2.5 border border-outline-variant/40 text-on-surface font-label-caps-sm text-center tracking-widest block hover:bg-surface-variant transition-colors"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              </div>
            ) : (
              /* Cart & Booking form */
              <form onSubmit={handleCheckout} className="space-y-6">
                {errorMessage && (
                  <div className="p-3 bg-error-container/40 border border-error/30 text-error text-xs font-body-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Cart Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider">
                      SELECTED TOWELS &amp; ACCESSORIES
                    </span>
                    <Link
                      href="/products"
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs text-secondary hover:underline inline-flex items-center gap-1"
                    >
                      Browse Catalog <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {cart.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-outline-variant/60 bg-surface-container-lowest">
                      <p className="text-xs text-on-surface-variant mb-3">
                        Your bag is currently empty.
                      </p>
                      <button
                        type="button"
                        onClick={handleAddDefaultTowel}
                        className="px-4 py-2 bg-primary-container text-surface text-xs font-label-caps-sm tracking-wider"
                      >
                        + ADD TOWLE. DAILY RENTAL (Rp50.000)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="p-3 bg-surface-container-lowest border border-outline-variant/40 flex items-center gap-3"
                        >
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-14 h-14 object-contain bg-surface-container-low p-1 border border-outline-variant/20 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-headline-sm text-xs text-primary font-medium truncate">
                              {item.product.name}
                            </h4>
                            <span className="font-body-sm text-xs font-semibold text-primary block mt-0.5 tabular-nums">
                              Rp{item.product.price.toLocaleString('id-ID')}
                            </span>
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center border border-outline-variant/50 bg-surface shrink-0">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs hover:bg-surface-variant"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs hover:bg-surface-variant"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-outline hover:text-error p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rental Day Choice */}
                <div>
                  <label className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider block mb-2">
                    RENTAL DATE
                  </label>
                  <select
                    value={dateChoice}
                    onChange={(e) => setDateChoice(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 p-2.5 text-xs text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="Today (Until Sunset 19:30)">Today (Until Sunset 19:30)</option>
                    <option value="Tomorrow (Full Day Pass)">Tomorrow (Full Day Pass)</option>
                    <option value="This Weekend (Saturday/Sunday)">This Weekend (Saturday/Sunday)</option>
                  </select>
                </div>

                {/* Collection Method */}
                <div>
                  <label className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider block mb-2">
                    COLLECTION METHOD
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                        deliveryType === 'kiosk'
                          ? 'bg-surface-container-low border-primary'
                          : 'bg-surface-container-lowest border-outline-variant/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliv"
                        checked={deliveryType === 'kiosk'}
                        onChange={() => setDeliveryType('kiosk')}
                        className="mt-0.5 text-primary focus:ring-secondary"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between font-medium text-primary">
                          <span>Beachfront Locker Pickup</span>
                          <span className="text-secondary font-semibold">FREE</span>
                        </div>
                        <p className="text-on-surface-variant mt-0.5 text-[11px]">
                          Instant self-service tap at our beach kiosk lockers.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                        deliveryType === 'villa'
                          ? 'bg-surface-container-low border-primary'
                          : 'bg-surface-container-lowest border-outline-variant/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliv"
                        checked={deliveryType === 'villa'}
                        onChange={() => setDeliveryType('villa')}
                        className="mt-0.5 text-primary focus:ring-secondary"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between font-medium text-primary">
                          <span>Villa / Hotel Delivery</span>
                          <span className="font-semibold text-primary tabular-nums">+Rp30.000</span>
                        </div>
                        <p className="text-on-surface-variant mt-0.5 text-[11px]">
                          Delivered directly to your stay in Canggu, Seminyak, or Berawa.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Beach Hub Selection */}
                <div>
                  <label className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider block mb-2">
                    DESTINATION BEACH HUB
                  </label>
                  <select
                    value={selectedBeach}
                    onChange={(e) => setSelectedBeach(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 p-2.5 text-xs text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="CANGGU">Canggu (Batu Bolong / The Lawn)</option>
                    <option value="BERAWA">Berawa (Echo Beach Hub)</option>
                    <option value="SEMINYAK">Seminyak (Petitenget Pavilion)</option>
                    <option value="ULUWATU">Uluwatu (Padang Padang Bay)</option>
                    <option value="KUTA">Kuta (Boardwalk Kiosk)</option>
                    <option value="SANUR">Sanur (Karang Beach)</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 pt-2 border-t border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider">
                      CONTACT &amp; GUEST DETAILS
                    </span>
                    {!user && (
                      <Link href="/login" className="text-[11px] text-secondary hover:underline">
                        Sign in for faster booking
                      </Link>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp / Phone Number *"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address (for digital receipt)"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  {deliveryType === 'villa' && (
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Villa Name & Room / Address *"
                        value={villaAddress}
                        onChange={(e) => setVillaAddress(e.target.value)}
                        className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="bg-surface-container-low p-4 border border-outline-variant/30 space-y-1.5 text-xs font-body-sm">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Items Subtotal</span>
                    <span className="tabular-nums">Rp{cartTotal.toLocaleString('id-ID')}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Villa Delivery</span>
                      <span className="tabular-nums">Rp{deliveryFee.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-outline-variant/30 flex justify-between font-semibold text-primary text-sm">
                    <span>Total Amount</span>
                    <span className="tabular-nums">Rp{grandTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant/70 italic mt-1">
                    * Pay on arrival or via contactless tap at seaside locker.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-3.5 bg-primary-container text-surface font-label-caps-lg text-label-caps-lg tracking-widest hover:bg-on-surface-variant transition-colors shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'PROCESSING RESERVATION...' : 'CONFIRM RESERVATION'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
