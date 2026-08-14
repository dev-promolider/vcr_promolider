module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  darkMode: 'class',
  purge: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'hm-primary': '#18d600',
        'hm-primary-hover': '#119e00',
        'sidebar-bg': '#0b1120',
        'sidebar-logo': '#0f172a',
        'slate-400': '#9CA3AF',
        'slate-700': '#334155',
        'slate-800': '#1E293B',
        'slate-900': '#0F172A',
      },
      width: {
        'sidebar': '260px',
        'sidebar-collapsed': '80px',
      },
      margin: {
        'sidebar': '260px',
      },
      minHeight: {
        '44': '44px',
      },
      zIndex: {
        '60': '60',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
