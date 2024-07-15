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
          'primary': "#1565D8",
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
  plugins: [ require("daisyui")],

  daisyui: {
    themes: [], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "d-",
  },
}