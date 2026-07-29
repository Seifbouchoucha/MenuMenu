interface HeroProps {
  index: number;
  total: number;
}

export default function Hero({ index, total }: HeroProps) {
  return (
    <section
      data-hero
      className="fixed inset-0 w-full h-screen overflow-hidden bg-background select-none"
      style={{ zIndex: total - index }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          data-hero-img
          src="/mio-mondo.jpg"
          alt="Interior"
          className="absolute inset-0 w-full h-full object-cover blur-[1px]"
          draggable={false}
        />
        <div
          data-hero-overlay
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background"
        />
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
      </div>

      <div
        data-hero-content
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-sans" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            Since 2024
          </p>
          <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl text-white font-light tracking-wider mb-6" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.8)' }}>
            ONLINE
            <br />
            <span className="text-gold italic">MENU</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base tracking-[0.2em] uppercase font-sans max-w-xl mx-auto leading-relaxed" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}>
            Experience every flavor through motion
          </p>
        </div>

        <div className="mt-12">
          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 0.55 * 1, behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-white text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-700 hover:border-gold/50"
          >
            <span className="relative z-10">Explore Menu</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-700" />
          </button>
        </div>
      </div>

      <div
        data-hero-indicator
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-sans">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
