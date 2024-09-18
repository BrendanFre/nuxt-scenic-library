import { copyFileSync, mkdirSync } from 'fs'
import { createResolver } from '@nuxt/kit'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('plugin');
  const { resolve } = createResolver(import.meta.url)
  const sourceFile = resolve('./runtime/components/placeholder.webp')
  const destDir = resolve(_nuxt.options.rootDir, 'public')
  const destFile = resolve(destDir, 'placeholder.webp')
  mkdirSync(destDir, { recursive: true })
  copyFileSync(sourceFile, destFile)
  console.log('Plugin injected by my-module!')
})
