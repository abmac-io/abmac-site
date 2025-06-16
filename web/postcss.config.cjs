const postcssJitProps = require('postcss-jit-props');
const autoprefixer = require('autoprefixer');
const postcssuse = require('postcss-use');
const presetenv = require('postcss-preset-env');
const path = require('path');

module.exports = {
  plugins: [
    autoprefixer,
    presetenv,
    postcssuse,
    postcssJitProps({
      files: [
        path.resolve(__dirname, 'node_modules/open-props/open-props.min.css'),
      ]
    }),
  ]
}
