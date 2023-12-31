const replitTokensToCSSVars = {
  backgroundRoot: "--background-root",
  backgroundDefault: "--background-default",
  backgroundHigher: "--background-higher",
  backgroundHighest: "--background-highest",
  backgroundOverlay: "--background-overlay",
  foregroundDefault: "--foreground-default",
  foregroundDimmer: "--foreground-dimmer",
  foregroundDimmest: "--foreground-dimmest",
  outlineDimmest: "--outline-dimmest",
  outlineDimmer: "--outline-dimmer",
  outlineDefault: "--outline-default",
  outlineStronger: "--outline-stronger",
  outlineStrongest: "--outline-strongest",
  accentPrimaryDimmest: "--accent-primary-dimmest",
  accentPrimaryDimmer: "--accent-primary-dimmer",
  accentPrimaryDefault: "--accent-primary-default",
  accentPrimaryStronger: "--accent-primary-stronger",
  accentPrimaryStrongest: "--accent-primary-strongest", 
  accentPositiveDimmest: "--accent-positive-dimmest",
  accentPositiveDimmer: "--accent-positive-dimmer",
  accentPositiveDefault: "--accent-positive-default",
  accentPositiveStronger: "--accent-positive-stronger",
  accentPositiveStrongest: "--accent-positive-strongest",
  accentNegativeDimmest: "--accent-negative-dimmest",
  accentNegativeDimmer: "--accent-negative-dimmer",
  accentNegativeDefault: "--accent-negative-default",
  accentNegativeStronger: "--accent-negative-stronger",
  accentNegativeStrongest: "--accent-negative-strongest",
  redDimmest: "--red-dimmest",
  redDimmer: "--red-dimmer",
  redDefault: "--red-default",
  redStronger: "--red-stronger",
  redStrongest: "--red-strongest",
  orangeDimmest: "--orange-dimmest",
  orangeDimmer: "--orange-dimmer",
  orangeDefault: "--orange-default",
  orangeStronger: "--orange-stronger",
  orangeStrongest: "--orange-strongest",
  yellowDimmest: "--yellow-dimmest",
  yellowDimmer: "--yellow-dimmer",
  yellowDefault: "--yellow-default",
  yellowStronger: "--yellow-stronger",
  yellowStrongest: "--yellow-strongest",
  limeDimmest: "--lime-dimmest",
  limeDimmer: "--lime-dimmer",
  limeDefault: "--lime-default",
  limeStronger: "--lime-stronger",
  limeStrongest: "--lime-strongest",
  greenDimmest: "--green-dimmest",
  greenDimmer: "--green-dimmer",
  greenDefault: "--green-default",
  greenStronger: "--green-stronger",
  greenStrongest: "--green-strongest",
  tealDimmest: "--teal-dimmest",
  tealDimmer: "--teal-dimmer",
  tealDefault: "--teal-default",
  tealStronger: "--teal-stronger",
  tealStrongest: "--teal-strongest",
  blueDimmest: "--blue-dimmest",
  blueDimmer: "--blue-dimmer",
  blueDefault: "--blue-default",
  blueStronger: "--blue-stronger",
  blueStrongest: "--blue-strongest",
  blurpleDimmest: "--blurple-dimmest",
  blurpleDimmer: "--blurple-dimmer",
  blurpleDefault: "--blurple-default",
  blurpleStronger: "--blurple-stronger",
  blurpleStrongest: "--blurple-strongest",
  purpleDimmest: "--purple-dimmest",
  purpleDimmer: "--purple-dimmer",
  purpleDefault: "--purple-default",
  purpleStronger: "--purple-stronger",
  purpleStrongest: "--purple-strongest",
  magentaDimmest: "--magenta-dimmest",
  magentaDimmer: "--magenta-dimmer",
  magentaDefault: "--magenta-default",
  magentaStronger: "--magenta-stronger",
  magentaStrongest: "--magenta-strongest",
  pinkDimmest: "--pink-dimmest",
  pinkDimmer: "--pink-dimmer",
  pinkDefault: "--pink-default",
  pinkStronger: "--pink-stronger",
  pinkStrongest: "--pink-strongest",
  greyDimmest: "--grey-dimmest",
  greyDimmer: "--grey-dimmer",
  greyDefault: "--grey-default",
  greyStronger: "--grey-stronger",
  greyStrongest: "--grey-strongest",
  brownDimmest: "--brown-dimmest",
  brownDimmer: "--brown-dimmer",
  brownDefault: "--brown-default",
  brownStronger: "--brown-stronger",
  brownStrongest: "--brown-strongest",
  black: "--black",
  white: "--white",
};

// wrap all the replitTokensToCSSVars values in var()
const tokens = Object.keys(replitTokensToCSSVars).reduce((acc, key) => {
  acc[key] = `var(${replitTokensToCSSVars[key]})`;
  return acc;
}, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",,
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: tokens,
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("flowbite/plugin"),
  ],
};
