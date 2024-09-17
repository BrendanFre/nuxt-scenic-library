import { defineNuxtModule, createResolver, addComponentsDir, installModule } from '@nuxt/kit'

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
    await installModule('@nuxt/icon', {
      serverBundle: {
        mode: 'local',
        collections: ['pajamas'],
      },
    },
    )
    await installModule('@nuxt/image')
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
