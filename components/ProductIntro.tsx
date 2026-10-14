export default function ProductIntro() {
  return (
    <section className="py-20 lg:py-28 bg-surface" id="product">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-label-caps-sm text-label-caps-sm text-on-surface-variant tracking-[0.25em] uppercase block mb-4">
            THE TOWLE EXPERIENCE
          </span>
          <h2 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-primary font-normal tracking-tight mb-6">
            More Than Just a Towel.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed max-w-xl mx-auto">
            One thoughtfully designed towel, made to give you more comfort without giving you more to carry.
          </p>
          <div className="w-12 h-[1px] bg-outline-variant/60 mx-auto mt-8"></div>
        </div>
      </div>
    </section>
  );
}
