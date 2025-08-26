/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',       // toggles via `.dark` on <html> or <body>
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/**/*.html',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#818cf8',
          DEFAULT: '#6366f1',
          dark:  '#4f46e5'
        },
        accent: {
          light: '#38bdf8',
          DEFAULT: '#0ea5e9',
          dark:  '#0369a1'
        },
        neutral: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular']
      },
      screens: {
        '2xl': '1536px'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'even', 'odd', 'disabled'],
      opacity:         ['disabled'],
      cursor:          ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
