'use client';

import { useState } from 'react';
import { X, Check, ShieldCheck, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

interface RentalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocation?: string;
  onOrderComplete: (itemCount: number) => void;
}

export default function RentalDrawer({
  isOpen,
  onClose,
  initialLocation = 'CANGGU',
  onOrderComplete,
}: RentalDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryType, setDeliveryType] = useState<'kiosk' | 'villa'>('kiosk');
  const [selectedBeach, setSelectedBeach] = useState(initialLocation);
  const [dateChoice, setDateChoice] = useState('today');
  const [extraPillow, setExtraPillow] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [villaAddress, setVillaAddress] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const basePrice = 50000;
  const deliveryFee = deliveryType === 'villa' ? 30000 : 0;
  const extraPillowFee = extraPillow ? 15000 : 0;
  const totalPrice = basePrice * quantity + deliveryFee + extraPillowFee * quantity;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TWL-${selectedBeach.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);
    setIsConfirmed(true);
    onOrderComplete(quantity);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface text-on-surface border-l border-outline-variant/30 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface">
            <div>
              <span className="font-label-caps-sm text-[10px] text-secondary tracking-widest uppercase block">
                {isConfirmed ? 'RESERVATION CONFIRMED' : 'BEACH ESSENTIALS'}
              </span>
              <h2 className="font-headline-sm text-lg text-primary font-medium">
                {isConfirmed ? 'Your TOWLE. Pass' : 'Rent a TOWLE.'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!isConfirmed ? (
              <form id="rental-form" onSubmit={handleConfirmReservation} className="space-y-6">
                {/* Product Summary Item */}
                <div className="p-4 bg-surface-container-lowest border border-outline-variant/40 flex items-center gap-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8mbEpHNpkx-T2on4YAjoFokcXSpxAL9_WgUOYIusNB7_DPkE21LT-M4F-ja6d-tnWhi_oi6zgEzVegId2hyynJVXWup_EYEaeUYT2ZrxAt5g5ItK1yfHVPAG4UOjR5iIRuEOCZXaCbR307QcuYEpGdMcN6rQa6vULiWJZfzASed_IGS86hp7r5CJ-ROqtOz03wb920vxO3wzMXJsyB7btNbSfKvTxs0WV4s4Vis6oEtcMLMDHXQuddQ"
                    alt="TOWLE"
                    className="w-16 h-16 object-contain bg-surface-container-low p-1 border border-outline-variant/30"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <h3 className="font-headline-sm text-sm text-primary font-medium">
                      TOWLE. Daily Rental
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      Waffle linen + Inflatable pillow + Valuables pocket
                    </p>
                    <span className="font-body-sm text-sm font-semibold text-primary block mt-1 tabular-nums">
                      Rp50.000 / day
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-outline-variant/50 bg-surface">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-sm font-medium hover:bg-surface-variant transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold tabular-nums">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-sm font-medium hover:bg-surface-variant transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider block mb-2">
                    RENTAL DAY
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDateChoice('today')}
                      className={`py-2 px-3 text-xs font-label-caps-sm text-center border transition-all ${
                        dateChoice === 'today'
                          ? 'bg-primary-container text-surface border-primary-container'
                          : 'bg-surface-container-lowest border-outline-variant/50 text-on-surface'
                      }`}
                    >
                      TODAY
                    </button>
                    <button
                      type="button"
                      onClick={() => setDateChoice('tomorrow')}
                      className={`py-2 px-3 text-xs font-label-caps-sm text-center border transition-all ${
                        dateChoice === 'tomorrow'
                          ? 'bg-primary-container text-surface border-primary-container'
                          : 'bg-surface-container-lowest border-outline-variant/50 text-on-surface'
                      }`}
                    >
                      TOMORROW
                    </button>
                    <button
                      type="button"
                      onClick={() => setDateChoice('weekend')}
                      className={`py-2 px-3 text-xs font-label-caps-sm text-center border transition-all ${
                        dateChoice === 'weekend'
                          ? 'bg-primary-container text-surface border-primary-container'
                          : 'bg-surface-container-lowest border-outline-variant/50 text-on-surface'
                      }`}
                    >
                      THIS WEEKEND
                    </button>
                  </div>
                </div>

                {/* Pickup / Delivery Options */}
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
                        name="deliveryType"
                        value="kiosk"
                        checked={deliveryType === 'kiosk'}
                        onChange={() => setDeliveryType('kiosk')}
                        className="mt-0.5 text-primary focus:ring-secondary"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between font-medium text-primary">
                          <span>Beachfront Locker Pickup</span>
                          <span className="text-secondary font-semibold">FREE</span>
                        </div>
                        <p className="text-on-surface-variant mt-0.5">
                          Instant self-service tap at our beachfront kiosks.
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
                        name="deliveryType"
                        value="villa"
                        checked={deliveryType === 'villa'}
                        onChange={() => setDeliveryType('villa')}
                        className="mt-0.5 text-primary focus:ring-secondary"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between font-medium text-primary">
                          <span>Villa / Hotel Delivery</span>
                          <span className="font-semibold text-primary tabular-nums">+Rp30.000</span>
                        </div>
                        <p className="text-on-surface-variant mt-0.5">
                          Delivered directly to your stay in Canggu, Seminyak, or Berawa.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Location Selection */}
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

                {/* Add-on Extra Inflatable Pillow */}
                <div className="p-3 bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-medium text-primary block">
                      Extra Inflatable Pillow
                    </span>
                    <span className="text-on-surface-variant text-[11px]">
                      Second pillow for a partner (+Rp15.000/ea)
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraPillow}
                      onChange={(e) => setExtraPillow(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-outline-variant/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>

                {/* Guest Details */}
                <div className="space-y-3 pt-2 border-t border-outline-variant/30">
                  <span className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider block">
                    CONTACT DETAILS
                  </span>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp / Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  {deliveryType === 'villa' && (
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Villa Name or Room Address"
                        value={villaAddress}
                        onChange={(e) => setVillaAddress(e.target.value)}
                        className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Order Total Breakdown */}
                <div className="bg-surface-container-low p-4 border border-outline-variant/30 space-y-1.5 text-xs font-body-sm">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>TOWLE. Rental ({quantity}x)</span>
                    <span className="tabular-nums">Rp{(basePrice * quantity).toLocaleString('id-ID')}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Villa Delivery</span>
                      <span className="tabular-nums">Rp{deliveryFee.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  {extraPillow && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Extra Pillow ({quantity}x)</span>
                      <span className="tabular-nums">Rp{(extraPillowFee * quantity).toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-outline-variant/30 flex justify-between font-semibold text-primary text-sm">
                    <span>Total Due at Pickup</span>
                    <span className="tabular-nums">Rp{totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary-container text-surface font-label-caps-lg text-label-caps-lg tracking-widest hover:bg-on-surface-variant transition-colors shadow-md cursor-pointer"
                >
                  CONFIRM RESERVATION
                </button>
              </form>
            ) : (
              /* Confirmation / Voucher Pass */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-6 bg-surface-container-lowest border-2 border-primary-container text-center relative shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary-container/60 text-secondary mx-auto flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="font-label-caps-sm text-[10px] tracking-widest text-secondary block mb-1">
                    BEACH PASS READY
                  </span>
                  <h3 className="font-display-lg text-2xl text-primary font-normal mb-2">
                    {reservationCode}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Show this code or tap your phone at the {selectedBeach} seaside locker.
                  </p>

                  {/* Visual Barcode Mock */}
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
                      {reservationCode}
                    </span>
                  </div>

                  <div className="space-y-2 text-left text-xs bg-surface-container-low p-3.5 border border-outline-variant/30 font-body-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Guest:</span>
                      <span className="font-medium">{guestName || 'Valued Guest'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Hub:</span>
                      <span className="font-medium">{selectedBeach} Beach</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Quantity:</span>
                      <span className="font-medium">{quantity} Towel{quantity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Return by:</span>
                      <span className="font-medium">Sunset (19:00 PM)</span>
                    </div>
                    <div className="pt-2 border-t border-outline-variant/20 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="tabular-nums">Rp{totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary-container/30 border border-secondary/20 text-xs text-on-secondary-container flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Zero Environmental Waste</p>
                    <p className="text-[11px] opacity-85 mt-0.5">
                      Your towel is sanitized, UV-sealed, and ready for pickup. No laundry to pack home.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 bg-primary-container text-surface font-label-caps-lg text-center tracking-widest hover:bg-on-surface-variant transition-colors"
                >
                  DONE &amp; RETURN TO SHOP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
