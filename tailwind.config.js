/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0C0A09',
        secondary: '#1C1917',
        gold: '#C9A24B',
        'gold-light': '#EAD9A5',
        'gold-dark': '#8B6B1F',
        bronze: '#6B4F10',
        cream: '#F5EFE4',
        muted: '#A8A29E',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        bodoni: ['Bodoni Moda', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'slow-spin': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 0.3s steps(4) infinite',
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
        'shine': 'shine 4s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
        'twinkle': 'twinkle 3.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'breathe': 'breathe 10s ease-in-out 4s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '250% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
        'glow-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
          '50%': { transform: 'scale(1.3)', opacity: 1 },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '70%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(10px)', opacity: 0 },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.003) rotate(0.08deg)' },
          '50%': { transform: 'scale(1.005) rotate(0deg)' },
          '75%': { transform: 'scale(1.003) rotate(-0.08deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 25%)' },
          '90%': { transform: 'translate(-10%, -10%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
