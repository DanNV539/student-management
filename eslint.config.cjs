const path = require('path')
const prettierConfig = require('eslint-config-prettier')
const eslintPluginPrettier = require('eslint-plugin-prettier')

module.exports = {
  plugins: {
    prettier: eslintPluginPrettier
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js']
      }
    }
  },
  languageOptions: {
    ecmaVersion: 2021, // Corresponds to ES2021
    sourceType: 'module',
    globals: {
      // Define Node.js globals
      __dirname: 'readonly',
      process: 'readonly',
      module: 'readonly',
      require: 'readonly'
    }
  },
  rules: {
    ...prettierConfig.rules,
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  },
  ignores: ['node_modules']
}
