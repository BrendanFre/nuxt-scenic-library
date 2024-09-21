// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/icon', 'my-module', '@nuxt/test-utils/module'],
  postcss: {
    plugins: {
      'postcss-responsive-type': {},
      'autoprefixer': {},
      'cssnano': {},
    },
  },
  ssr: true,

})
