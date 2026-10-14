export default function LifestyleBanner() {
  return (
    <section className="relative w-full h-[65vh] lg:h-[75vh] overflow-hidden">
      <img
        alt="Serene Balinese coastal lifestyle couple relaxing on wooden lounger under beach umbrella"
        className="w-full h-full object-cover object-center filter brightness-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw7YhSG8b1Ms_2FZmQc08TVILBh6gf0QeDtH8f9sHAsyO5pQ-x6MhwgG1lubYgUC8x_zCKnUxf-xEaFSQJWSEDuvHGhc0CjjidV6XLo04ZiruqxbMZLlaEmppj-xUG6ueus7T6ptvPRi3Gp7OK213PXvCt2c-LJIExQkZx6Yx0WQkzS0C2EAJZTkkeIQNGv2w2Ky7Lf1xWZw_73gviMpDYM_p22K238RAa5p4V4yByYUjyl8tf5B3myQ"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-primary-container/20"></div>
      <div className="absolute inset-x-0 bottom-0 py-14 bg-gradient-to-t from-primary-container/85 via-primary-container/35 to-transparent">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 text-center">
          <h2 className="font-headline-lg lg:font-display-lg text-headline-lg lg:text-display-lg text-surface tracking-wider uppercase font-light drop-shadow-sm">
            LESS TO CARRY. MORE TO ENJOY.
          </h2>
          <p className="font-label-caps-sm text-label-caps-sm text-surface/80 tracking-[0.3em] mt-3">
            SLOW COASTAL LIVING IN BALI
          </p>
        </div>
      </div>
    </section>
  );
}
