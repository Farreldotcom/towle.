'use client';

interface HeroProps {
  onRentClick: () => void;
}

export default function Hero({ onRentClick }: HeroProps) {
  const scrollToProduct = () => {
    const elem = document.querySelector('#product');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end pb-20 lg:pb-32 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Sun-drenched coastal beach life with premium towel lounging"
          className="w-full h-full object-cover object-center filter brightness-[0.96]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjSmnrqXkzf6qPeCzBfwJZw-y58FMPP66qT7Zto9ij5BiArW_dOACqrPid8WXSoHD9AQAJR5bjudK-umQvheDJf9l5tzwb7WUhv-DyAeira1eIu2V2ICRWsuAm_1Kj7KKeuhPwQucpkp7NW3uEmoxTlDcwCiPEAZgOTiY_9e8XIm618cfLnhFNJw3OP0ha2Hj8B91_Kwk_P9BTaefNyA5zaH7c_s6bgKOoMNJ0Bt_DMPb5UsWDMciypNlG8byRMELZ_1XpekKD8KeSWQM"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/75 via-primary-container/25 to-transparent"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 text-surface">
        <div className="max-w-2xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-surface/70"></span>
            <span className="font-label-caps-sm text-label-caps-sm tracking-widest text-surface/90">
              THE BEACH ESSENTIAL
            </span>
          </div>

          <h1 className="font-display-lg-mobile lg:font-display-xl text-display-lg-mobile lg:text-display-xl font-normal leading-[1.05] tracking-tight mb-6 text-surface drop-shadow-sm">
            Make Your Beach Day Better.
          </h1>

          <p className="font-body-lg text-body-lg text-surface/85 max-w-lg mb-8 font-light leading-relaxed mx-auto">
            A multifunctional beach towel designed for comfort, convenience, and freedom by the sea.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
            <button
              onClick={onRentClick}
              className="font-label-caps-lg text-label-caps-lg px-8 py-4 bg-surface text-primary-container hover:bg-surface-variant transition-all duration-200 text-center cursor-pointer tracking-widest shadow-md"
              type="button"
            >
              RENT A TOWLE
            </button>
            <button
              onClick={scrollToProduct}
              className="font-label-caps-lg text-label-caps-lg px-8 py-4 border border-surface/80 text-surface hover:bg-surface/10 backdrop-blur-sm transition-all duration-200 text-center cursor-pointer tracking-widest"
              type="button"
            >
              EXPLORE THE TOWEL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
