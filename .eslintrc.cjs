// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // So that we can use the latest ECMAScript features such as dynamic imports and nullish coalescing
    sourceType: 'module', // Since we are using ECMAScript modules
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Resolves to the version currently installed
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      typescript: {
        extensions: ['.js', '.ts', '.mjs', '.jsx', '.tsx', '.json'],
      },
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
    'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx'],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json|proto)$',
    ],
  },
  extends: [
    // recommended
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',

    // disabled formatting-related rules for using prettier config
    'prettier',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', 'simple-import-sort', 'prettier'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // https://eslint.org/docs/rules/complexity
    complexity: ['error', 12],

    // https://eslint.org/docs/rules/max-depth
    'max-depth': ['error', 4],

    // https://eslint.org/docs/rules/sort-imports
    // 'sort-imports': ['error'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/v4.6.1/packages/eslint-plugin/docs/rules/naming-convention.md
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
        filter: {
          // allowed env variables like '__ENV__', '__PUBLIC_PATH__'
          regex: '^__[A-Z_]+__$',
          match: false,
        },
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike', //class, interface, typeAlias, enum, typeParameter
        format: ['PascalCase', 'UPPER_CASE'],
      },
    ],

    //https://eslint.org/docs/rules/no-else-return
    'no-else-return': ['warn', { allowElseIf: true }],

    // https://eslint.org/docs/rules/no-console
    'no-console': 'warn',

    // https://github.com/typescript-eslint/typescript-eslint/blob/v4.6.1/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
    '@typescript-eslint/no-explicit-any': 'error',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    '@typescript-eslint/no-magic-numbers': ['warn', { ignore: [-1, 0, 1] }],
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],
    // https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'import/no-unresolved': ['error', { caseSensitive: true }],
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // `react` related packages.
          ['^react'],
          // Packages
          ['^@?\\w'],
          // Internal packages.
          ['^(@|src|app|components|utils|config|vendored-lib)(/.*|$)'],
          // Relative imports
          [
            // Relative imports from current directory
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            // Relative imports from parent directory
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
          ],
          // Styles
          [
            '\\.s?css$',
            'App.module.s?css$',
            'contentStyles.module.s?css$',
            'module.s?css$',
            '^index\\.module\\.s?css$',
          ],
        ],
      },
    ],
  },
};
