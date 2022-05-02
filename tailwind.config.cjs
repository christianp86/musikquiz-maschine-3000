function getCSSVariable(variable) {
  return `var(${variable})`;
}

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      base_color: {
        10: getCSSVariable('--clr-10'),
        20: getCSSVariable('--clr-20'),
        30: getCSSVariable('--clr-30'),
        40: getCSSVariable('--clr-40'),
        50: getCSSVariable('--clr-50'),
        60: getCSSVariable('--clr-60'),
        70: getCSSVariable('--clr-70'),
        80: getCSSVariable('--clr-80'),
        90: getCSSVariable('--clr-90'),
        95: getCSSVariable('--clr-95'),
        100: getCSSVariable('--clr'),
      },
      primary: {
        10: getCSSVariable('--primary-10'),
        15: getCSSVariable('--primary-15'),
        25: getCSSVariable('--primary-25'),
        50: getCSSVariable('--primary-50'),
        75: getCSSVariable('--primary-75'),
        100: getCSSVariable('--primary'),
      },
      accent: {
        10: getCSSVariable('--accent-10'),
        15: getCSSVariable('--accent-15'),
        25: getCSSVariable('--accent-25'),
        50: getCSSVariable('--accent-50'),
        75: getCSSVariable('--accent-75'),
        100: getCSSVariable('--accent'),
      }
    },
    extend: {},
  },
  plugins: [],
}
