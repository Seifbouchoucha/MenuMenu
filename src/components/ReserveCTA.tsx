import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReserveCTA() {
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
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-28 md:py-40 overflow-hidden border-t border-white/5"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 55%, rgba(201,162,75,0.08), transparent 65%)',
        }}
      />
      <div
        ref={contentRef}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-gold/70" />
          <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-sans">
            Reservations
          </span>
          <span className="w-8 h-[1px] bg-gold/70" />
        </div>

        <h2 className="font-display text-4xl md:text-6xl text-white font-light leading-[1.1] mb-6">
          Your Table Is Waiting
        </h2>

        <p className="text-white/60 text-sm md:text-base font-sans leading-relaxed max-w-xl mx-auto mb-10">
          Experience every flavor in motion. Reserve your table today and let
          the journey begin.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+21650727071"
            className="group inline-flex items-center gap-3 bg-gold text-background font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300 cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>Call +216 50 727 071</span>
          </a>
          <span className="text-white/40 text-xs font-sans tracking-[0.15em] uppercase">
            Open daily · 8:00 – 23:00
          </span>
        </div>
      </div>
    </section>
  );
}