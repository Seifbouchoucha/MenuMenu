import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuSections } from '../data/menuData';

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

// Sections with the flat start index of each category
const sectionsWithStart = (() => {
  let offset = 0;
  return menuSections.map((s) => {
    const start = offset;
    offset += s.items.length;
    return { ...s, start };
  });
})();

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('Hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close explore dropdown on outside click / Escape
  useEffect(() => {
    if (!exploreOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExploreOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [exploreOpen]);

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

  const scrollToItem = (flatIndex: number) => {
    const viewH = window.innerHeight;
    const scrollPerItem = viewH * 0.55;
    // Hero takes slot 0, item at flatIndex takes slot flatIndex + 1
    const target = (1 + flatIndex) * scrollPerItem;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const toggleExplore = () => {
    setExploreOpen(!exploreOpen);
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-700 ${
        isScrolled || exploreOpen
          ? 'bg-background/70 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-[width] duration-150 ease-out z-10`}
        style={{ width: `${progress * 100}%` }}
      />
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={toggleExplore}
          className={`flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer ${
            exploreOpen ? 'text-gold' : 'text-white/50 hover:text-white/80'
          }`}
        >
          <span>Menu</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${exploreOpen ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div className="hidden lg:flex items-center gap-1 mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer ${
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
          className="lg:hidden flex flex-col gap-1.5 relative z-[10000] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`} />
          <span className={`block h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[2.5px]' : 'w-4'}`} />
        </button>
      </div>

      {/* Explore dropdown: full item list with prices */}
      {exploreOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60 max-h-[70vh] overflow-y-auto" data-lenis-prevent>
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
            {sectionsWithStart.map((section) => (
              <div key={section.category}>
                <h3 className="font-serif text-gold text-sm tracking-[0.25em] uppercase mb-4 pb-2 border-b border-white/10">
                  {section.category}
                </h3>
                <ul>
                  {section.items.map((item, i) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          scrollToItem(section.start + i);
                          setExploreOpen(false);
                        }}
                        className="w-full flex items-baseline justify-between gap-3 py-1.5 group"
                      >
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </span>
                        <span className="text-xs text-gold/80 shrink-0">{item.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

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
