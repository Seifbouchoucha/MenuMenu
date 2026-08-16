import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  index: number;
  total: number;
  active?: boolean;
}

export default function Hero({ index, total, active }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!active || !rootRef.current) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const finalState = {
        '[data-hero-img]': { scale: 1, opacity: 1 },
        '[data-hero-bar]': { y: 0, opacity: 1 },
        '[data-hero-eyebrow]': { y: 0, opacity: 1 },
        '[data-hero-line]': { yPercent: 0, opacity: 1 },
        '[data-hero-divider]': { scaleX: 1 },
        '[data-hero-sub]': { y: 0, opacity: 1 },
        '[data-hero-stats]': { y: 0, opacity: 1 },
        '[data-hero-cta]': { y: 0, opacity: 1 },
        '[data-hero-glass]': { y: 0, opacity: 1 },
      };

      if (reduceMotion) {
        Object.entries(finalState).forEach(([sel, vars]) => gsap.set(sel, vars));
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '[data-hero-img]',
        { scale: 1.14, opacity: 0.35 },
        { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' }
      )
        .fromTo(
          '[data-hero-bar]',
          { y: -16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=1.6'
        )
        .fromTo(
          '[data-hero-line]',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.3, stagger: 0.14, ease: 'power4.out' },
          '-=0.6'
        )
        .fromTo(
          '[data-hero-divider]',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut' },
          '-=0.9'
        )
        .fromTo(
          '[data-hero-sub]',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          '[data-hero-glass]',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          '-=0.5'
        )
        .fromTo(
          '[data-hero-stats]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '[data-hero-cta]',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
    }, rootRef);

    return () => ctx.revert();
  }, [active]);

  const exploreMenu = () => {
    window.scrollTo({ top: window.innerHeight * 0.55, behavior: 'smooth' });
  };

  return (
    <section
      ref={rootRef}
      data-hero
      className="fixed inset-0 w-full h-screen overflow-hidden bg-background select-none"
      style={{ zIndex: total - index }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Base image */}
        <img
          data-hero-img
          src="/mio-mondo.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-[3px] scale-110"
          draggable={false}
        />

        {/* Color grading — warm tint */}
        <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />

        {/* Dark duotone — deepens the image */}
        <div className="absolute inset-0 bg-background/45 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/25 mix-blend-color" />

        {/* Vignette — dark edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(12,10,9,0.85) 100%)',
          }}
        />

        {/* Animated gold glow — slow pulse */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            animationDuration: '8s',
            background:
              'radial-gradient(ellipse 40% 35% at 25% 65%, rgba(201,162,75,0.08), transparent 60%)',
          }}
        />

        {/* Second gold glow — offset */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 35% 30% at 75% 30%, rgba(201,162,75,0.05), transparent 55%)',
          }}
        />

        {/* Gradient overlays */}
        <div
          data-hero-overlay
          className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/65 to-background/35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      {/* Corner ornaments */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <span className="absolute top-10 left-10 md:top-12 md:left-12 w-10 h-10 border-t border-l border-white/10" />
        <span className="absolute top-10 right-10 md:top-12 md:right-12 w-10 h-10 border-t border-r border-white/10" />
        <span className="absolute bottom-10 left-10 md:bottom-12 md:left-12 w-10 h-10 border-b border-l border-white/10" />
        <span className="absolute bottom-10 right-10 md:bottom-12 md:right-12 w-10 h-10 border-b border-r border-white/10" />
      </div>

      {/* Top bar */}
      <div
        data-hero-bar
        className="absolute top-10 md:top-12 left-0 right-0 z-20 px-8 md:px-14 flex items-center justify-between font-sans"
      >
        <a
          href="tel:+21650727071"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold/80"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>+216 50 727 071</span>
        </a>
      </div>

      {/* Main content */}
      <div
        data-hero-content
        className="relative z-20 h-full flex items-center px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: message */}
            <div className="lg:col-span-6">
              {/* Title */}
              <h1 className="text-white font-light">
                <span className="block overflow-hidden pb-1">
                  <span
                    data-hero-line
                    className="block font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[0.02em] text-white"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
                  >
                    TASTE
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span
                    data-hero-line
                    className="block font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[0.02em] gold-liquid"
                  >
                    THE MOMENT
                  </span>
                </span>
              </h1>

              {/* Divider */}
              <div data-hero-divider className="flex items-center gap-4 mt-8">
                <span className="block w-16 h-[1px] bg-gold/60" />
                <span className="block w-2 h-2 rounded-full bg-gold" />
                <span className="block w-28 h-[1px] bg-white/15" />
              </div>

              {/* Subtitle */}
              <p
                data-hero-sub
                className="text-white/65 text-[11px] md:text-xs tracking-[0.35em] uppercase font-sans max-w-md leading-loose mt-6"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
              >
                Experience every flavor through motion — an immersive cinematic journey
              </p>

              {/* CTA */}
              <div data-hero-cta className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a
                  href="tel:+21650727071"
                  className="inline-flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase font-sans bg-gold text-background px-10 py-4 hover:bg-gold-light transition-colors duration-300 cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Reserve Your Table</span>
                </a>
                <button
                  onClick={exploreMenu}
                  className="group inline-flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase font-sans text-white/50 hover:text-gold transition-colors duration-300 cursor-pointer"
                >
                  <span>Explore the Menu</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Stats */}
              <div
                data-hero-stats
                className="mt-12 font-sans text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white/50 flex items-center gap-5"
              >
                <span>07 Categories</span>
                <span className="w-[3px] h-[3px] rounded-full bg-gold/60" />
                <span>35 Signature Dishes</span>
                <span className="w-[3px] h-[3px] rounded-full bg-gold/60" />
                <span>Est. 2026</span>
              </div>
            </div>

            {/* Right: glass info panel */}
            <div data-hero-glass className="lg:col-span-6 hidden lg:block">
              <div className="relative">
                <div className="absolute -top-6 -right-4 w-20 h-20 border-t border-r border-gold/30" aria-hidden="true" />
                <div className="absolute -bottom-6 -left-4 w-20 h-20 border-b border-l border-gold/30" aria-hidden="true" />

                <div className="relative bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8 space-y-6">
                  {/* Open now */}
                  <div className="flex items-center gap-3">
                    <span className="relative flex w-2.5 h-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-ping" />
                      <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-gold" />
                    </span>
                    <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/70">
                      Open Now
                    </span>
                  </div>

                  <div className="h-[1px] w-full bg-white/10" />

                  {/* Hours */}
                  <div className="space-y-3">
                    <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/80">
                      Hours
                    </h3>
                    <div className="space-y-2 font-sans text-sm">
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/70">Mon – Fri</span>
                        <span className="text-white/40 text-xs tracking-wide">8:00 – 23:00</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/70">Saturday</span>
                        <span className="text-white/40 text-xs tracking-wide">9:00 – 00:00</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/70">Sunday</span>
                        <span className="text-white/40 text-xs tracking-wide">9:00 – 22:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/10" />

                  {/* Location */}
                  <div className="space-y-2">
                    <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/80">
                      Find Us
                    </h3>
                    <p className="font-sans text-sm text-white/60 leading-relaxed">
                      Route Touristique Khezema 4057,
                      <br />
                      Boulevard du 14 Janvier, Sousse 4057
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}