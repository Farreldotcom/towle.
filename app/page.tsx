'use client';

import { useState } from 'react';
import { useStore } from '@/contexts/StoreContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductIntro from '@/components/ProductIntro';
import TowelDiagram3D from '@/components/TowelDiagram3D';
import EditorialStatement from '@/components/EditorialStatement';
import HowItWorks from '@/components/HowItWorks';
import LifestyleBanner from '@/components/LifestyleBanner';
import Pricing from '@/components/Pricing';
import WhyTowleComparison from '@/components/WhyTowleComparison';
import Locations from '@/components/Locations';
import FaqSection from '@/components/FaqSection';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import RentalDrawer from '@/components/RentalDrawer';
import SearchModal from '@/components/SearchModal';
import InfoModal from '@/components/InfoModal';

export default function Home() {
  const { setIsCartOpen } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'terms' | 'privacy' | 'sustainability' | null>(null);
  const [preselectedLocation, setPreselectedLocation] = useState('CANGGU');

  const handleOpenRental = (location = 'CANGGU') => {
    setPreselectedLocation(location);
    setIsCartOpen(true);
  };

  const handleSelectSearchResult = (targetId: string) => {
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* 01: Announcement Bar */}
      <AnnouncementBar />

      {/* 02: Sticky Top Navigation */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 03: Editorial Hero */}
        <Hero onRentClick={() => handleOpenRental('CANGGU')} />

        {/* 04: Product Introduction */}
        <ProductIntro />

        {/* 05: Unique Product Visualization Diagram (Hero Moment with 3D Tilt) */}
        <TowelDiagram3D />

        {/* 06: Editorial Brand Statement */}
        <EditorialStatement />

        {/* 07: How It Works */}
        <HowItWorks />

        {/* 08: Lifestyle Editorial Banner */}
        <LifestyleBanner />

        {/* 09: Pricing */}
        <Pricing onRentClick={() => handleOpenRental('CANGGU')} />

        {/* 10: Why TOWLE. Editorial Split Comparison */}
        <WhyTowleComparison />

        {/* 11: Locations with interactive kiosks */}
        <Locations onSelectLocationForRent={(loc) => handleOpenRental(loc)} />

        {/* 12: Frequently Asked Questions Accordion */}
        <FaqSection />

        {/* 13: Final Editorial Sunset CTA */}
        <FinalCta onRentClick={() => handleOpenRental('CANGGU')} />
      </main>

      {/* 14: Rich Editorial Footer */}
      <Footer
        onRentClick={() => handleOpenRental('CANGGU')}
        onOpenInfoModal={(type) => setInfoModalType(type)}
      />

      {/* Slide-over Rental & Booking Drawer */}
      <RentalDrawer initialLocation={preselectedLocation} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={handleSelectSearchResult}
      />

      {/* Info & Legal Modal */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </div>
  );
}
