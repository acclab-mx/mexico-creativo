export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Resonancias',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/waypoint.js', '~/plugins/tooltips.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/google-analytics',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },

  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },

  serverMiddleware: {
    '': '~/api/logger.js',
    '/api/tematicas': '~/api/tematicas.js',
    '/api/componentes': '~/api/componentes.js',
    '/api/playground': '~/api/playground.js',
    '/api/etiquetas': '~/api/etiquetas.js',
    '/api/card': '~/api/card.js',
    '/api/test': '~/api/test.js',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  googleFonts: {
    families: {
      Montserrat: [400, 500, 600, 700, 800],
      'Open+Sans': [200, 300, 400, 500, 600, 700, 800],
    },
  },

  googleAnalytics: {
    id: 'G-Q9S610M03K',
  },

  extend(config, ctx) {
    // Force eslint autofix on save
    if (ctx.isDev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true,
        },
      })
    }
  },
}
