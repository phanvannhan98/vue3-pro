const gridTemplateRows = {};

for (let i = 7; i <= 20; i++) {
  gridTemplateRows[i] = `repeat(${i}, minmax(0, 1fr))`;
}

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins, sans-serif',
      },
      gridTemplateRows,
      colors: {
        cgray: {
          1: '#F8F8F8',
          2: '#F1F2F3',
          3: '#E1E3E6',
          4: '#C3C7CE',
          5: '#757D8A',
          6: '#5A6474',
        },
        cblue: {
          1: 'rgba(78, 115, 248, 0.08)', // Colors/Blue/8% Opacity
          2: 'rgba(78, 115, 248, 0.24)', // Colors/Blue/24% Opacity
          3: 'rgba(78, 115, 248, 0.4)', // Colors/Blue/40% Opacity
          4: 'rgba(78, 115, 248, 0.64)', // Colors/Blue/64% Opacity
          5: '#4E73F8', // Colors/Blue/100% Opacity - rgba(78, 115, 248, 1)
        },
        cdark: {
          1: '#404D61',
        },
        cred: {
          1: 'rgba(244, 60, 60, 0.08)', // Colors/Red/8% Opacity
          2: 'rgba(244, 60, 60, 0.24)', // Colors/Red/24% Opacity
          3: 'rgba(244, 60, 60, 0.4)', // Colors/Red/40% Opacity
          4: 'rgba(244, 60, 60, 0.64)', // Colors/Red/64% Opacity
          5: '#F43C3C', // Colors/Red/100% Opacity - rgba(244, 60, 60, 1)
        },
        cyellow: {
          1: 'gba(252, 165, 73, 0.08)', // Colors/Yellow/8% Opacity
          2: 'gba(252, 165, 73, 0.24)', // Colors/Yellow/24% Opacity
          3: 'gba(252, 165, 73, 0.4)', // Colors/Yellow/40% Opacity
          4: 'gba(252, 165, 73, 0.64)', // Colors/Yellow/64% Opacity
          5: '#FCA549', // Colors/Yellow/100% Opacity - gba(252, 165, 73, 1)
        },
        cgreen: {
          1: 'rgba(7, 162, 135, 0.08)', // Colors/Green/8% Opacity
          2: 'rgba(7, 162, 135, 0.24)', // Colors/Green/24% Opacity
          3: 'rgba(7, 162, 135, 0.4)', // Colors/Green/40% Opacity
          4: 'rgba(7, 162, 135, 0.64)', // Colors/Green/64% Opacity
          5: '#07A287', // Colors/Green/100% Opacity - rgba(7, 162, 135, 1)
        },
        cpink: {
          1: 'rgba(255, 75, 110, 0.08)', // Colors/Pink/8% Opacity
          2: 'rgba(255, 75, 110, 0.24)', // Colors/Pink/24% Opacity
          3: 'rgba(255, 75, 110, 0.4)', // Colors/Pink/40% Opacity
          4: 'rgba(255, 75, 110, 0.64)', // Colors/Pink/64% Opacity
          5: '#FF4B6E', // Colors/Pink/100% Opacity - rgba(255, 75, 110, 1)
        },
        cpurple: {
          1: 'rgba(85, 82, 217, 0.08)', // Colors/Purple/8% Opacity
          2: 'rgba(85, 82, 217, 0.24)', // Colors/Purple/24% Opacity
          3: 'rgba(85, 82, 217, 0.4)', // Colors/Purple/40% Opacity
          4: 'rgba(85, 82, 217, 0.64)', // Colors/Purple/64% Opacity
          5: '#5552D9', // Colors/Purple/100% Opacity - rgba(85, 82, 217, 1)
        },
      },
      backgroundImage: {
        'cblue-6': 'linear-gradient(180deg, #6989FE 0%, #3C64F4 100%)', // Gradients / Blue
        'cred-6': 'linear-gradient(180deg, #FF5959 0%, #EF2C2C 100%)', // Gradients / Red
        'cyellow-6': 'linear-gradient(180deg, #FCA549 0%, #F39531 100%)', // Gradients / Yellow
        'cgreen-6': 'linear-gradient(180deg, #08B395 0%, #0C977F 100%)', // Gradients / Green
        'cpink-6': 'linear-gradient(180deg, #FF4B6E 0%, #EC234A 100%)', // Gradients / Pink
        'cpurple-6': 'linear-gradient(180deg, #605CF3 0%, #4D4AC8 100%)', // Gradients / Purple
      },
      opacity: {
        6: '0.06',
      },
      spacing: {
        13: '52px',
      },
      fontSize: {
        xsm: ['13px', '17px'],
        smd: ['15px', '23px'],
      },
      keyframes: {
        typing: {
          '0%, 100%': { transform: 'none' },
          '50%': { transform: 'translateY(-20%)' },
        },
      },
      animation: {
        typing: 'typing 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
