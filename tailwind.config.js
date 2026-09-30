/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./admin/**/*.{html,js}",
    "./assets/js/**/*.{js,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'usb-navy': 'var(--usb-primary)',
        'usb-navy-dark': 'var(--usb-primary-dark)',
        'usb-navy-light': 'var(--usb-primary-light)',
        'usb-navy-soft': 'var(--usb-primary-soft)',
        'usb-gold': 'var(--usb-accent)',
        'usb-gold-dark': 'var(--usb-accent-dark)',
        'usb-gold-light': 'var(--usb-accent-light)',
        'usb-gold-hover': 'var(--usb-accent-hover)',
        'usb-blue': '#2563EB',
        'usb-blue-dark': '#1D4ED8',
        'usb-green': '#059669',
        'usb-slate': '#0F172A',
        'usb-surface': '#F8FAFC',
        usb: {
          black: '#0B1120',
          primary: '#0F172A',
          primaryDark: '#0A0F1D',
          primaryLight: '#1E293B',
          blue: '#2563EB',
          blueDark: '#1D4ED8',
          blueLight: '#60A5FA',
          accent: '#2563EB'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};
