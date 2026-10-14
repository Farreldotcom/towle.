'use client';

interface FinalCtaProps {
  onRentClick: () => void;
}

export default function FinalCta({ onRentClick }: FinalCtaProps) {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Coastal seaside sunset editorial"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiaAgQb5Tm64eC6eRLO_an0N6amKO672QP3bDMeOOuTSJrxJjWBfaur9Up6tQCmHYof7L5vH_JIj_WzS-InfnRmgvuMIzMEeZ8nrzswgdCRvZhD1DpfO8KSoz4UdsJ3icL7mD5PJI5Llss9Cu-NYxWGhDSwDxJyhsGQ30CfE7XORFdJib--hAV5DsulEJ0j_GoKfBPbsEuluMH5DGoPkB46g5YQB4zuYoZYTDz4-4Y9XsdQzE7SdpkKQ"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary-container/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 text-center text-surface">
        <div className="max-w-2xl mx-auto">
          <span className="font-label-caps-sm text-label-caps-sm text-surface/70 tracking-[0.25em] uppercase block mb-4">
            BEGIN YOUR RENTAL
          </span>
          <h2 className="font-display-lg-mobile lg:font-display-lg text-display-lg-mobile lg:text-display-lg font-normal tracking-tight mb-4 text-surface">
            READY FOR A BETTER BEACH DAY?
          </h2>
          <p className="font-body-lg text-body-lg text-surface/80 font-light mb-8 max-w-md mx-auto">
            Less to carry. More to enjoy.
          </p>
          <button
            onClick={onRentClick}
            className="inline-block font-label-caps-lg text-label-caps-lg px-10 py-4 bg-surface text-primary-container hover:bg-surface-variant transition-all duration-200 tracking-widest cursor-pointer shadow-lg active:scale-95"
            type="button"
          >
            RENT A TOWLE
          </button>
        </div>
      </div>
    </section>
  );
}
