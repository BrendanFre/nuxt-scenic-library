/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-responsive-font'),
    require('postcss-responsive-type')(),
  ],
}

module.exports = config
