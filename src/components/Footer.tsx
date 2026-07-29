import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      className="relative bg-background border-t border-white/5 py-24 md:py-32"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                <span className="text-background font-bold">M</span>
              </div>
              <span className="font-serif text-2xl text-white tracking-wider">MENU</span>
            </div>
            <p className="text-white/40 text-sm font-sans leading-relaxed max-w-xs">
              An immersive cinematic dining experience. Where every flavor is revealed through motion.
            </p>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/30">Hours</h3>
            <div className="space-y-3 font-sans text-sm">
              <div className="flex justify-between text-white/60">
                <span>Monday - Friday</span>
                <span>8:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Saturday</span>
                <span>9:00 AM - 12:00 AM</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Sunday</span>
                <span>9:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/30">Contact</h3>
            <div className="space-y-3 font-sans text-sm text-white/60">
              <p>123 Gourmet Street</p>
              <p>New York, NY 10001</p>
              <p className="text-gold hover:text-gold/80 transition-colors cursor-pointer">+1 (555) 123-4567</p>
              <p className="text-gold hover:text-gold/80 transition-colors cursor-pointer">hello@menumenu.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-sans">
            &copy; 2024 MENU. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Instagram', 'Facebook', 'Twitter'].map((social) => (
              <button
                key={social}
                className="text-white/20 hover:text-gold text-xs tracking-[0.15em] uppercase transition-colors duration-500"
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
