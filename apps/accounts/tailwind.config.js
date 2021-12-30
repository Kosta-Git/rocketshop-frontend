const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  presets: [require(join(__dirname, '../../tailwind-workspace-preset.js'))],
  content: [
    ...createGlobPatternsForDependencies(__dirname),
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'core/**/*.{js,ts,jsx,tsx}'),
  ]
};
