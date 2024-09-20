import { copyFileSync, mkdirSync } from 'node:fs'
import { defineNuxtModule, createResolver, addComponentsDir, installModule } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

// Module options TypeScript interface definition
export interface ModuleOptions {
  prefix?: string
  glboal?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    configKey: 'scenic',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: 's',
  },
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // addPlugin({
    //   src: resolve('./runtime/plugin'),
    //   mode: 'server' })
    placeHolderToPublic(resolve, _nuxt)
    await installModule('@nuxt/icon', {
      serverBundle: {
        mode: 'local',
        collections: ['pajamas'],
      },
    },
    )
    await installModule('@nuxt/image', {
      // dir: [resolve('./runtime/components'),
      //   resolve('./runtime/assets'),
      // ],
    },
    )
    // _nuxt.options.css.push(resolve('./runtime/style.css'))

    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolve('./runtime/*.{mjs,js,ts}'),
          ],
        },
      },
    },
    )

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addComponentsDir(
      {
        path: resolve('./runtime/components/'),
        prefix: _options.prefix,
      },
    )
  },
},
)
function placeHolderToPublic(resolve: (...path: string[]) => string, _nuxt: Nuxt) {
  const sourceFile = resolve('./runtime/components/placeholder.webp')
  const destDir = resolve(_nuxt.options.rootDir, 'public/scenic')
  const destFile = resolve(destDir, 'placeholder.webp')
  mkdirSync(destDir, { recursive: true })
  copyFileSync(sourceFile, destFile)
}
