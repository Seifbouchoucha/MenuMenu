import { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReserveCTA from './components/ReserveCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { menuSections } from './data/menuData';

gsap.registerPlugin(ScrollTrigger);

const allItems = menuSections.flatMap((s) => s.items);
const TOTAL = allItems.length + 1; // +1 for Hero

export default function App() {
  const [loading, setLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      setupMenuAnimation();
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  function setupMenuAnimation() {
    const menu = menuRef.current;
    if (!menu) return;

    const viewH = window.innerHeight;
    const scrollPerItem = viewH * 0.55;
    const totalScroll = TOTAL * scrollPerItem;

    // Single master ScrollTrigger: pins the menu + drives ALL animations via onUpdate
    ScrollTrigger.create({
      trigger: menu,
      start: 'top top',
      end: () => `+=${totalScroll}`,
      pin: true,
      pinSpacing: true,
      scrub: 1.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        const ov = 0.007;

        // ---- Hero (index 0) ----
        const hero = menu.querySelector('[data-hero]') as HTMLElement;
        const heroImg = menu.querySelector('[data-hero-img]') as HTMLElement;
        const heroOverlay = menu.querySelector('[data-hero-overlay]') as HTMLElement;
        const heroContent = menu.querySelector('[data-hero-content]') as HTMLElement;
        const heroIndicator = menu.querySelector('[data-hero-indicator]') as HTMLElement;

        if (hero && heroImg) {
          const slotEnd = 1 / TOTAL;
          let heroO = 1;
          if (p > slotEnd - ov) {
            heroO = 1 - Math.min(1, Math.max(0, (p - (slotEnd - ov)) / ov));
          }
          if (p > slotEnd) heroO = 0;
          gsap.set(hero, { opacity: heroO, pointerEvents: heroO > 0.3 ? 'auto' : 'none' });

          // Hero image scale + overlay
          const heroLocal = Math.min(1, Math.max(0, p / slotEnd));
          gsap.set(heroImg, { scale: 1 + heroLocal * 0.35, y: -heroLocal * 30 });
          if (heroOverlay) gsap.set(heroOverlay, { opacity: 0.25 + heroLocal * 0.35 });

          // Hero content fades out faster
          if (heroContent) {
            const contentEnd = slotEnd * 0.5;
            const co = p < contentEnd ? 1 : Math.max(0, 1 - (p - contentEnd) / (slotEnd * 0.5));
            gsap.set(heroContent, { opacity: co, y: -heroLocal * 50, filter: `blur(${heroLocal * 3}px)` });
          }
          if (heroIndicator) {
            const indEnd = slotEnd * 0.4;
            const io = p < indEnd ? 1 : Math.max(0, 1 - (p - indEnd) / (slotEnd * 0.6));
            gsap.set(heroIndicator, { opacity: io });
          }
          // Don't process menu items yet if hero is the only visible one
          if (heroO > 0.5) return; // skip item animation while hero dominates
        }

        // ---- Menu items (indices 1 … TOTAL-1) ----
        for (let i = 1; i < TOTAL; i++) {
          const section = menu.querySelector(`[data-menu-index="${i}"]`) as HTMLElement;
          const img = menu.querySelector(`[data-menu-img="${i}"]`) as HTMLElement;
          const overlay = menu.querySelector(`[data-menu-overlay="${i}"]`) as HTMLElement;
          const panel = menu.querySelector(`[data-menu-panel="${i}"]`) as HTMLElement;
          if (!section) continue;

          const slotStart = i / TOTAL;
          const slotEnd = (i + 1) / TOTAL;

          // opacity (crossfade)
          let opacity = 1;
          if (p < slotStart) {
            opacity = Math.min(1, Math.max(0, (p - (slotStart - ov)) / ov));
          }
          if (p > slotEnd - ov) {
            opacity = 1 - Math.min(1, Math.max(0, (p - (slotEnd - ov)) / ov));
          }
          if (p < slotStart - ov || p > slotEnd) opacity = 0;
          gsap.set(section, { opacity, pointerEvents: opacity > 0.3 ? 'auto' : 'none' });
          if (opacity <= 0) continue;

          // image scale + translate
          const local = (p - (slotStart - ov)) / (slotEnd - (slotStart - ov));
          const c = Math.max(0, Math.min(1, local));
          if (img) gsap.set(img, { scale: 1 + c * 0.06, y: -c * 18 });
          if (overlay) gsap.set(overlay, { opacity: 0.4 + c * 0.25 });

          // panel
          if (!panel) continue;
          if (p < slotStart + ov) {
            const ec = Math.min(1, Math.max(0, (p - (slotStart - ov)) / (ov * 2)));
            gsap.set(panel, { y: (1 - ec) * 50, opacity: ec, filter: `blur(${(1 - ec) * 6}px)` });
          } else if (p > slotEnd - ov) {
            const ex = Math.min(1, Math.max(0, (p - (slotEnd - ov)) / ov));
            gsap.set(panel, { y: ex * 40, opacity: 1 - ex, filter: `blur(${ex * 5}px)` });
          } else {
            gsap.set(panel, { y: 0, opacity: 1, filter: 'blur(0px)' });
          }
        }
      },
    });
  }

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}

      <div className={`min-h-screen bg-background text-white ${loading ? 'invisible' : 'visible'}`}>
        <CustomCursor />
        <Navigation />

        <main>
          <div ref={menuRef} className="relative">
            <Hero index={0} total={TOTAL} active={!loading} />
            {allItems.map((item, i) => (
              <MenuSection key={item.id} item={item} index={i + 1} total={TOTAL} />
            ))}
          </div>
        </main>

        <ReserveCTA />
        <Footer />
        <div className="noise-overlay" />
      </div>
    </>
  );
}
