import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beanRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    gsap.to(beanRef.current, {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: 'none',
    });

    tl.fromTo(
      beanRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(
      steamRef.current ? Array.from(steamRef.current.children) : [],
      { y: 20, opacity: 0 },
      { y: -30, opacity: 0.6, duration: 2, stagger: 0.3, ease: 'power1.out' }
    )
    .to(steamRef.current ? Array.from(steamRef.current.children) : [], {
      y: -60,
      opacity: 0,
      duration: 2,
      stagger: 0.3,
      ease: 'power1.in',
    }, '-=1.5')
    .to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut',
    }, '-=1')
    .fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=1.5'
    )
    .to(containerRef.current, {
      y: '-100%',
      duration: 1.2,
      ease: 'power3.inOut',
      delay: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center gap-8">
        <div ref={beanRef} className="relative w-20 h-20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-700 to-amber-950 shadow-2xl shadow-amber-900/50 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
              <path d="M6 2v3M10 2v3M14 2v3" />
            </svg>
          </div>
          {/* Steam */}
          <div ref={steamRef} className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-8 bg-gradient-to-t from-gold/40 to-transparent rounded-full"
              />
            ))}
          </div>
        </div>

        <div ref={textRef} className="text-center">
          <h1 className="font-serif text-4xl text-white tracking-[0.3em]">MENU</h1>
          <p className="font-sans text-xs text-muted tracking-[0.2em] mt-2 uppercase">Culinary Experience</p>
        </div>

        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold to-amber-500"
          />
        </div>
      </div>
    </div>
  );
}
