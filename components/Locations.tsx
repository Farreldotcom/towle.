'use client';

import { useState } from 'react';
import { Compass, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface BeachLocation {
  id: string;
  name: string;
  partnerKiosk: string;
  hours: string;
  distance: string;
  features: string;
  status: string;
}

const BEACHES: BeachLocation[] = [
  {
    id: 'canggu',
    name: 'CANGGU',
    partnerKiosk: 'Batu Bolong Seaside Lounge & The Lawn Kiosk',
    hours: '07:00 AM – 07:00 PM (Daily)',
    distance: 'Right on the beach path, 30m from high tide mark',
    features: 'Express QR lockers, instant return chute, sanitizer station',
    status: 'Pilot Station 01 — Open Daily',
  },
  {
    id: 'berawa',
    name: 'BERAWA',
    partnerKiosk: 'Echo Beach Surf Point & Berawa Hub',
    hours: '07:00 AM – 07:30 PM (Daily)',
    distance: 'Adjacent to Echo Beach Lifeguard Tower',
    features: 'Contactless RFID tap-and-go lockers, sun lotion bar',
    status: 'Pilot Station 02 — Open Daily',
  },
  {
    id: 'seminyak',
    name: 'SEMINYAK',
    partnerKiosk: 'Petitenget Sunset Pavilion & Partner Club',
    hours: '07:30 AM – 08:00 PM (Daily)',
    distance: 'Petitenget Temple beach promenade entrance',
    features: 'Chilled water dispenser, rapid towel return bay',
    status: 'Pilot Station 03 — Open Daily',
  },
  {
    id: 'uluwatu',
    name: 'ULUWATU',
    partnerKiosk: 'Padang Padang Clifftop Lookout & Bay Lounge',
    hours: '08:00 AM – 06:30 PM (Daily)',
    distance: 'Stairs base overlooking the cove',
    features: 'Tide warning display, sanitized sealed packs',
    status: 'Pilot Station 04 — Launching Soon',
  },
  {
    id: 'kuta',
    name: 'KUTA',
    partnerKiosk: 'Discovery Beach Boardwalk Kiosk',
    hours: '08:00 AM – 07:00 PM (Daily)',
    distance: 'Boardwalk central access, under palm canopy',
    features: 'Self-service dispenser, fast check-in',
    status: 'Pilot Station 05 — Launching Soon',
  },
  {
    id: 'sanur',
    name: 'SANUR',
    partnerKiosk: 'Karang Beach Sunrise Pavilion',
    hours: '06:30 AM – 06:30 PM (Daily)',
    distance: 'Paved seaside cycling path marker #12',
    features: 'Early morning sunrise pickup, cycle rack integration',
    status: 'Pilot Station 06 — Launching Soon',
  },
];

interface LocationsProps {
  onSelectLocationForRent: (locationName: string) => void;
}

export default function Locations({ onSelectLocationForRent }: LocationsProps) {
  const [activeBeachId, setActiveBeachId] = useState('canggu');

  const activeBeach = BEACHES.find((b) => b.id === activeBeachId) || BEACHES[0];

  const scrollToFaq = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.querySelector('#faq');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-surface" id="locations">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-secondary-container/60 text-on-secondary-container font-label-caps-sm text-[10px] tracking-widest uppercase mb-4">
            PILOT LAUNCH PHASE — COMING SOON
          </div>
          <h2 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-primary font-normal tracking-tight mb-4">
            Find TOWLE.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
            Coming soon to Bali&apos;s favorite beaches.
          </p>
        </div>

        {/* Destination Pills & Map Graphic */}
        <div className="max-w-4xl mx-auto">
          {/* Beach Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            {BEACHES.map((beach) => {
              const isSelected = beach.id === activeBeachId;
              return (
                <button
                  key={beach.id}
                  onClick={() => setActiveBeachId(beach.id)}
                  type="button"
                  className={`px-6 py-3 border font-label-caps-lg text-label-caps-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary-container text-surface border-primary-container shadow-md scale-105'
                      : 'bg-surface-container-lowest text-primary border-outline-variant/60 hover:border-primary'
                  }`}
                >
                  {beach.name}
                </button>
              );
            })}
          </div>

          {/* Minimalist Bali Coast Map Representation & Active Kiosk Card */}
          <div className="relative bg-surface-container p-8 sm:p-12 border border-outline-variant/40 text-center overflow-hidden shadow-sm">
            <div className="max-w-xl mx-auto relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-container/50 text-secondary mb-4">
                <Compass className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                {activeBeach.partnerKiosk}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                Direct beachfront lockers and partnering surf clubs will allow instant tap-and-go access with zero wait times.
              </p>

              {/* Station specifics */}
              <div className="bg-surface p-4 sm:p-6 border border-outline-variant/30 text-left mb-6 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs font-body-sm text-on-surface">
                  <MapPin className="w-4 h-4 text-secondary shrink-0" />
                  <span className="font-medium">Location:</span> {activeBeach.distance}
                </div>
                <div className="flex items-center gap-2.5 text-xs font-body-sm text-on-surface">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span className="font-medium">Hours:</span> {activeBeach.hours}
                </div>
                <div className="flex items-center gap-2.5 text-xs font-body-sm text-on-surface">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  <span className="font-medium">Amenities:</span> {activeBeach.features}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onSelectLocationForRent(activeBeach.name)}
                  className="px-6 py-2.5 bg-primary-container text-surface font-label-caps-sm text-xs hover:bg-on-surface-variant transition-colors tracking-widest cursor-pointer w-full sm:w-auto"
                >
                  RESERVE AT {activeBeach.name}
                </button>
                <a
                  onClick={scrollToFaq}
                  className="font-label-caps-sm text-label-caps-sm text-primary underline underline-offset-4 hover:text-secondary transition-colors inline-flex items-center gap-1 cursor-pointer"
                  href="#faq"
                >
                  LEARN ABOUT OUR LOGISTICS <ArrowRight className="w-3.5 h-3.5 inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
