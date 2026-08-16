import { useState } from 'react';
import type { MenuItemData } from '../data/menuData';

interface MenuSectionProps {
  item: MenuItemData;
  index: number;
  total: number;
}

function splitPrice(price: string) {
  const [amount, currency] = price.split(' ');
  return { amount: amount ?? price, currency: currency ?? '' };
}

export default function MenuSection({ item, index, total }: MenuSectionProps) {
  const { amount, currency } = splitPrice(item.price);
  const [favorite, setFavorite] = useState(false);
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
          className="absolute inset-0 bg-gradient-to-t from-background via-background/80 via-55% to-background/10"
        />
      </div>

      <div
        data-menu-content={index}
        className="relative z-10 h-full flex items-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20 pointer-events-none"
      >
        <div data-menu-panel={index} className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-gold/70" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-sans">
              {item.category}
            </span>
          </div>

          <h2
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wide mb-5 leading-[1.05]"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
          >
            {item.title}
          </h2>

          <p className="text-white/70 text-sm md:text-base font-sans max-w-lg leading-relaxed mb-8">
            {item.description}
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl md:text-4xl text-gold font-light">{amount}</span>
              <span className="text-white/40 text-xs tracking-[0.2em] uppercase font-sans">{currency}</span>
            </div>
            <button
              onClick={() => setFavorite(!favorite)}
              aria-pressed={favorite}
              className={`group flex items-center gap-2 transition-colors duration-300 pointer-events-auto cursor-pointer ${
                favorite ? 'text-gold' : 'text-white/50 hover:text-gold'
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans">
                {favorite ? 'In Favorites' : 'Add to Favorites'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-12 right-8 md:right-16 z-10 pointer-events-none">
        <span className="font-display text-7xl md:text-9xl text-white/5 font-bold">
          {String(index).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-10 flex items-baseline gap-2 font-display pointer-events-none">
        <span className="text-white/30 text-lg md:text-xl">
          {String(index).padStart(2, '0')}
        </span>
        <span className="text-gold/60 text-xs md:text-sm">/</span>
        <span className="text-white/20 text-sm md:text-base">
          {String(total - 1).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
