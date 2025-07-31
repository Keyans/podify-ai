/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          'bg': 'var(--bg-primary, #000000)',
          'card': 'var(--bg-secondary, #111111)',
          'input': 'var(--bg-tertiary, #1a1a1a)',
          'border': 'var(--border-color, #333333)',
          'text': {
            DEFAULT: 'var(--text-primary, #ffffff)',
            'secondary': 'var(--text-secondary, #b0b0b0)',
            'tertiary': 'var(--text-tertiary, #808080)',
          },
          'accent': {
            DEFAULT: 'var(--accent-color, #ff5722)',
            'hover': 'var(--accent-hover, #e64a19)',
          },
          'success': '#4CAF50',
          'warning': '#FFC107',
          'error': '#f44336',
          'info': '#2196F3',
          'purple': '#9c27b0',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-dark-bg',
    'bg-dark-card',
    'bg-dark-input',
    'text-dark-text',
    'text-dark-text-secondary',
    'text-dark-text-tertiary',
    'border-dark-border',
    'border-dark-accent',
  ]
}