module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'jingshonline-web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /**
   * plugins config 插件配置
   */
  plugins: [
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/cookie', ssr: true },
    { src: '~/plugins/route', ssr: true }
  ],
  env: {
    baseUrl: 'http://gateway.dev.jingshonline.net'
  },
  server: {
    port: 9527,
    open: true
  }

}

