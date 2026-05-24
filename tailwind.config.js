export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0b1a30',
        deep: '#030712',
        gold: '#c99700',
        silver: '#f5f5f7',
      },
      boxShadow: {
        glow: '0 0 40px rgba(201, 151, 0, 0.2)',
      },
      backgroundImage: {
        cosmic: 'radial-gradient(circle at top, rgba(196, 182, 147, 0.12), transparent 28%), radial-gradient(circle at bottom, rgba(255, 255, 255, 0.05), transparent 24%), linear-gradient(180deg, #0b1a30 0%, #030712 100%)',
      },
    },
  },
  plugins: [],
};
