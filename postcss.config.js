// 压缩 CSS 文件
const PurgeCss = require('@fullhuman/postcss-purgecss');

const PurgeOptions = {
  // Specify the paths to all of the template files in your project 
  content: [
    './src/**/*.html',
    './src/**/*.tsx',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
};
module.exports = {
  plugins: [
    require.resolve('tailwindcss'),
    PurgeCss(PurgeOptions),
    require.resolve('autoprefixer'),
      {
        'postcss-preset-env': {
          browsers: 'last 2 versions',
        },
      }
  ],
};
