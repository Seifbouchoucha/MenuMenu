import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  'Coffee', 'Breakfast', 'Pizza', 'Pasta', 'Burgers', 'Desserts', 'Drinks'
];

// Map each category to its starting item index in the flat list
const allItems = [
  { cat: 'Coffee', start: 0, count: 8 },
  { cat: 'Breakfast', start: 8, count: 5 },
  { cat: 'Pizza', start: 13, count: 4 },
  { cat: 'Pasta', start: 17, count: 4 },
  { cat: 'Burgers', start: 21, count: 4 },
  { cat: 'Desserts', start: 25, count: 5 },
  { cat: 'Drinks', start: 30, count: 5 },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('Hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is active via menu scroll progress
  useEffect(() => {
    const menu = document.querySelector('[data-menu-index]')?.parentElement;
    if (!menu) return;

    const st = ScrollTrigger.create({
      trigger: menu,
      start: 'top top',
      end: () => `+=${36 * window.innerHeight * 0.55}`,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Map progress to item index (hero = -1, items = 0-34)
        const itemIndex = Math.floor(p * 36) - 1;
        if (itemIndex < 0) { setActiveSection('Hero'); return; }
        for (const c of allItems) {
          if (itemIndex >= c.start && itemIndex < c.start + c.count) {
            setActiveSection(c.cat);
            return;
          }
        }
      },
    });

    return () => st.kill();
  }, []);

  const scrollToCategory = (category: string) => {
    const entry = allItems.find((c) => c.cat === category);
    if (!entry) return;
    const viewH = window.innerHeight;
    const scrollPerItem = viewH * 0.55;
    // Hero takes slot 0, items start at slot 1
    const target = (1 + entry.start) * scrollPerItem;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-700 ${
        isScrolled
          ? 'bg-background/70 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div />

        <div className="hidden lg:flex items-center gap-1 mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-500 ${
                activeSection === cat
                  ? 'text-gold'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {cat}
              {activeSection === cat && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-gold" />
              )}
            </button>
          ))}
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 relative z-[10000]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`} />
          <span className={`block h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[2.5px]' : 'w-4'}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[9998] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { scrollToCategory(cat); setMenuOpen(false); }}
              className={`text-lg tracking-[0.15em] uppercase transition-all duration-500 ${
                activeSection === cat ? 'text-gold' : 'text-white/60 hover:text-white/90'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
