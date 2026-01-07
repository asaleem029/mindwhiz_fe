module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Add paths to your components and pages
    './components/**/*.{js,ts,jsx,tsx}', // Add paths to your components
    './app/**/*.{js,ts,jsx,tsx}', // Add if you're using the app directory in Next.js 13
  ],
  theme: {
    extend: {
      spacing: {
        5: '1.25rem', // Ensure 'gap-5' is available in the spacing scale
      },
    },
  },
  plugins: [],
};
