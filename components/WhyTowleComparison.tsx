import { X, Check } from 'lucide-react';

export default function WhyTowleComparison() {
  return (
    <section className="py-20 lg:py-28 bg-surface-container-low border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-label-caps-sm text-label-caps-sm text-on-surface-variant tracking-[0.25em] uppercase block mb-3">
            THE CONTRAST
          </span>
          <h2 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-primary font-normal tracking-tight">
            Why TOWLE.?
          </h2>
        </div>

        {/* Strict 50/50 Dual Pane Viewport */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Column 1: WITHOUT TOWLE. */}
          <div className="p-8 sm:p-12 bg-surface-variant/50 border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-outline-variant/30 mb-8">
                <h3 className="font-label-caps-lg text-label-caps-lg text-on-surface-variant tracking-widest uppercase">
                  WITHOUT TOWLE.
                </h3>
                <X className="text-outline w-5 h-5" />
              </div>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="text-outline mt-1 font-mono text-sm shrink-0">—</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-normal">
                      Bring your own towel
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Takes up half your daypack and stays damp for hours.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-outline mt-1 font-mono text-sm shrink-0">—</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-normal">
                      Carry a separate bulky pillow
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Awkward to transport or improvising with balled-up sandy shirts.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-outline mt-1 font-mono text-sm shrink-0">—</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-normal">
                      Insecure personal belongings
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Constantly looking around to check your keys and phone on the sand.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-outline mt-1 font-mono text-sm shrink-0">—</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-normal">
                      Heavy beach gear fatigue
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Dragging loads of accessories just for a simple afternoon swim.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/20 text-on-surface-variant text-xs font-label-caps-sm">
              CLUTTERED &amp; COMPLICATED
            </div>
          </div>

          {/* Column 2: WITH TOWLE. */}
          <div className="p-8 sm:p-12 bg-surface-container-lowest border-2 border-primary-container flex flex-col justify-between shadow-[0_16px_40px_-12px_rgba(29,29,26,0.08)]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-primary-container/10 mb-8">
                <h3 className="font-label-caps-lg text-label-caps-lg text-primary tracking-widest uppercase font-semibold">
                  WITH TOWLE.
                </h3>
                <Check className="text-secondary w-6 h-6 stroke-[2.5]" />
              </div>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="text-secondary mt-0.5 text-base shrink-0">✦</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-medium">
                      One single refined piece
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed mt-0.5">
                      Pristine, freshly laundered, ultra-absorbent waffle linen ready at the beach.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-secondary mt-0.5 text-base shrink-0">✦</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-medium">
                      Built-in ergonomic pillow solution
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed mt-0.5">
                      Integrated sleeve with custom inflatable pillow for true book-reading comfort.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-secondary mt-0.5 text-base shrink-0">✦</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-medium">
                      Discreet integrated pocket
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed mt-0.5">
                      Keeps your essentials protected and tucked out of direct sight.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-secondary mt-0.5 text-base shrink-0">✦</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-primary font-medium">
                      Effortless coastal living
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed mt-0.5">
                      Walk freely with zero baggage and simply return when your swim is over.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/20 text-secondary text-xs font-label-caps-sm flex items-center justify-between">
              <span>DESIGNED FOR DISCERNING TRAVELERS</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
