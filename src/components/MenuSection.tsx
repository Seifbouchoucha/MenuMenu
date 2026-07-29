import type { MenuItemData } from '../data/menuData';

interface MenuSectionProps {
  item: MenuItemData;
  index: number;
  total: number;
}

export default function MenuSection({ item, index, total }: MenuSectionProps) {
  return (
    <section
      data-section={item.category}
      data-menu-index={index}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-background select-none"
      style={{ zIndex: total - index }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          data-menu-img={index}
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div
          data-menu-overlay={index}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/70 via-50% to-background/20"
        />
      </div>

      <div
        data-menu-content={index}
        className="relative z-10 h-full flex items-end pb-20 md:pb-28 px-6 md:px-12 lg:px-20 pointer-events-none"
      >
        <div data-menu-panel={index} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-[10px] tracking-[0.2em] uppercase font-sans">
              {item.category}
            </span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wide mb-4">
            {item.title}
          </h2>

          <p className="text-white/50 text-sm md:text-base font-sans max-w-lg leading-relaxed mb-6">
            {item.description}
          </p>

          <div className="flex items-center gap-6">
            <span className="font-serif text-3xl md:text-4xl text-gold font-light">
              {item.price}
            </span>
            <button className="group flex items-center gap-2 text-white/30 hover:text-gold transition-all duration-500 pointer-events-auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans">Add to Favorites</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-12 right-8 md:right-16 z-10 pointer-events-none">
        <span className="font-serif text-7xl md:text-9xl text-white/5 font-bold">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
