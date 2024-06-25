/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundColor: {
        "main-bg": "#357960",
        
      },
      
      colors: {
        'orange' : '#B59460',
        'pale-orange' : 'hsl(25, 100%, 94%)',
        'dark-blue' : 'hsl(220, 13%, 13%)',
        'dark-grayish-blue' : 'hsl(219, 9%, 45%)',
        'grayish-blue' : 'hsl(220, 14%, 75%)',
        'light-grayish-blue' : 'hsl(223, 64%, 98%)',
        'white' : 'hsl(0, 0%, 100%)',
        'black-75' : 'hsl(0, 0%, 0%)',
      },
      backgroundImage: {
        "hero":"url(C:\\Users\\VINUTHA R\\Desktop\\kalegoodu\\src\\assets\\hero.jpg)"
      }
    },
  },
  plugins: [],
}