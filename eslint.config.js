import eslintjs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts';
import stylisticJsPlugin from '@stylistic/eslint-plugin-js';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import prettierRecommendedPlugin from 'eslint-plugin-prettier/recommended';


export default [
  {
    ignores: [
      'build/**',
      'dist/**',
      'node_modules/**',
      'src/interface/assets/*',
      'eslint.config.js'
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
  },
  prettierRecommendedPlugin,
  eslintjs.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  ...tsEslint.configs.recommendedTypeChecked,
  {
    plugins: {
      'unused-imports': unusedImportsPlugin,
      '@typescript-eslint': tsEslint.plugin,
      '@stylistic/ts': stylisticTsPlugin,
      '@stylistic/js': stylisticJsPlugin,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'default-case': ['error'],
      'default-param-last': ['error'],
      'prefer-const': 'error',
      'max-classes-per-file': ['error', 1],
      'no-caller': ['error'],
      'no-constructor-return': ['error'],
      'no-eq-null': ['error'],
      'no-eval': ['error'],
      'no-extend-native': ['error'],
      'no-implicit-globals': ['error'],
      'no-implied-eval': ['error'],
      'no-invalid-this': ['error'],
      'no-iterator': ['error'],
      'no-labels': ['error'],
      'no-lone-blocks': ['error'],
      'no-loop-func': ['error'],
      'no-multi-str': ['error'],
      'no-new-func': ['error'],
      'no-new-wrappers': ['error'],
      'no-octal-escape': ['error'],
      'no-param-reassign': ['error'],
      'no-proto': ['error'],
      'no-return-assign': ['error'],
      'no-return-await': ['error'],
      'no-script-url': ['error'],
      'no-self-compare': ['error'],
      'no-sequences': ['error'],
      'no-throw-literal': ['error'],
      'no-useless-call': ['error'],
      'no-useless-concat': ['error'],
      'no-var': 'error',
      'no-void': ['error'],
      'prefer-regex-literals': ['error'],
      radix: ['error'],
      'require-await': ['error'],
  
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-member-accessibility': ['error'],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        }
      ],
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'does', 'should', 'has', 'can', 'did', 'will'],
        },
      ],
      "@typescript-eslint/prefer-for-of": "off",
      '@stylistic/ts/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      '@stylistic/ts/comma-spacing': ['error'],
      '@stylistic/ts/comma-dangle': [
        'error',
        {
          imports: 'always-multiline',
          arrays: 'always-multiline',
          objects: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
          enums: 'always-multiline',
        },
      ],

      '@stylistic/ts/function-call-spacing': ['error', 'never'],
      '@stylistic/ts/member-delimiter-style': 'error',
      '@stylistic/ts/padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@stylistic/js/arrow-parens': ["error", "always"],
      '@stylistic/js/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/js/indent': ["error", 2],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': 'error',
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/object-property-newline': ['off'],
      '@stylistic/js/quotes': ['error', 'double'],
      '@stylistic/js/semi': ['error', 'always'],
    },
  }
];
