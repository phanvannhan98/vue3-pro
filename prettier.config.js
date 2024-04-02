module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  bracketSpacing: true,
  vueIndentScriptAndStyle: false,
  quoteProps: 'as-needed',
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'auto',
};
