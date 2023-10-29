const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const buildTestCommand = () => `jest`;

module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json}': [buildTestCommand],
  'src/**/*.{js,jsx,ts,tsx,json}': [buildPrettierCommand],
  'src/**/*.{js,jsx,ts,tsx,json}': [buildEslintCommand],
};
