import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
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
    injectCss(resolve, _nuxt)

    // addPlugin({
    //   src: resolve('./runtime/plugin'),
    //   mode: 'server' })
    placeHolderToPublic(resolve, _nuxt)
    await installModule('@nuxt/icon', {
      serverBundle: {
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

const injectCss = (resolve: (...path: string[]) => string, scenic: Nuxt) => {
  const cssDir = 'runtime/components/postcss'
  const cssDirectoryPath = resolve('./', cssDir)

  // Check if the directory exists
  if (existsSync(cssDirectoryPath)) {
  // Read all files in the directory
    const cssFiles = readdirSync(cssDirectoryPath).filter(file => file.endsWith('.css'))

    cssFiles.forEach((fileName) => {
      const newPath: string = cssDirectoryPath + '/' + fileName
      console.log(newPath)
      scenic.options.css.push(newPath)
    })

    // Add each CSS file to the Nuxt build
    // cssFiles.forEach((file) => {
    //   scenic.options.css.push(join(, file))
    // })
  }
  else {
    console.warn(`[CSS Injector] The directory ${cssDirectoryPath} does not exist.`)
  }
}
