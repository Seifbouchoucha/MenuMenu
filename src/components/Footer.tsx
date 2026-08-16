import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: 'Instagram',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16z M12 7.03a4.97 4.97 0 100 9.94 4.97 4.97 0 000-9.94z M17.2 7a1.16 1.16 0 11-2.32 0 1.16 1.16 0 012.32 0z',
  },
  {
    name: 'Facebook',
    path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-3v-3h3V9.5C12 7.58 13.34 6.5 15.5 6.5c1.1 0 2.2.2 2.2.2v2.4h-1.24c-1.22 0-1.6.76-1.6 1.54V12h2.72l-.43 3h-2.29v6.8C18.56 20.87 22 16.84 22 12z',
  },
  {
    name: 'X',
    path: 'M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H2l8-9.2L1 2h7l4.8 6.3L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z',
  },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.fromTo(
      content,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative bg-background border-t border-white/10 pt-24 md:pt-28 pb-10"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
          {/* Brand */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(201,162,75,0.2)]">
                <span className="text-background font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display text-2xl text-white tracking-wider">MENU</span>
            </div>
            <p className="text-white/50 text-sm font-sans leading-relaxed max-w-xs">
              An immersive cinematic dining experience. Where every flavor is revealed through motion.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 transition-all duration-300 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-3 md:col-start-6 space-y-6">
            <h3 className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold/80">Hours</h3>
            <div className="space-y-4 font-sans text-sm">
              {[
                ['Monday – Friday', '8:00 – 23:00'],
                ['Saturday', '9:00 – 00:00'],
                ['Sunday', '9:00 – 22:00'],
              ].map(([day, hours]) => (
                <div key={day} className="flex flex-col">
                  <span className="text-white/70">{day}</span>
                  <span className="text-white/40 text-xs tracking-wide mt-0.5">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold/80">Contact</h3>
            <div className="space-y-4 font-sans text-sm text-white/60">
              <p className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-gold/70 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Route Touristique Khezema 4057,<br />Boulevard du 14 Janvier, Sousse 4057</span>
              </p>
              <a
                href="tel:+21650727071"
                className="flex items-center gap-3 text-gold hover:text-gold/80 transition-colors duration-300 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+216 50 727 071</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-sans tracking-wide">
            &copy; 2026 MENU. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-white/40 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer"
          >
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform duration-300">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
