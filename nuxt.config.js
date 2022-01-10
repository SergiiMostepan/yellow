const cssConfig = require("./config/css");
const modulesConfig = require("./config/modules")
const axiosConfig = require("./config/axios")
const routerConfig = require("./config/router");


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'yellow-media',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: cssConfig,
  // css: [],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [
  //   '@/plugins/axios',
  // ],
  router: routerConfig,
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: modulesConfig,
  axios: axiosConfig,
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
