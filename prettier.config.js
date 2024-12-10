/** @type {import('prettier').Config} */
module.exports = {
  // Set the line ending to `lf`.
  // https://prettier.io/docs/en/options.html#end-of-line
  endOfLine: 'lf',
  // Add trailing commas for object and array literals in ES5-compatible mode.
  // https://prettier.io/docs/en/options.html#semicolons
  semi: true,
  // https://prettier.io/docs/en/options.html#quotes
  singleQuote: true,
  // https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,
  // https://prettier.io/docs/en/options.html#trailing-commas
  trailingComma: 'es5',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '',
    '^[./]',
    '',
    '<TYPES>^[./]',
    '<TYPES>^react',
    '<TYPES>^next',
    '<TYPES>^@/',
    '<TYPES>',
  ],
  // Do not add semicolons at the end of statements.
  // Specify the parser plugins to use for import sorting.
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  // Use single quotes for string literals.
  // Combine type-only imports with value imports.
  importOrderTypeScriptVersion: '5.1.6',
  // Set the tab width to 2 spaces.

};
