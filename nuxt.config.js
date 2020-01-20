module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'jingshonline-web',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'jingshonline-web;京师在线官网' }
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
    },
    /**
     * Scss 变量
     */
    styleResources: {
      scss: './assets/_variables.scss'

    }
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '~/assets/_variables.scss', '~/assets/public.scss'],

  /**
   * plugins config 插件配置
   */
  plugins: [
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/cookie', ssr: true },
    { src: '~/plugins/custom', ssr: true },
    { src: '~/plugins/el-tree-select', ssr: false },
    { src: '~plugins/echarts', ssr: false },
    { src: '~plugins/filters', ssr: false },
    { src: '~utils/validate', ssr: false },
    { src: '~utils/index', ssr: false },
    { src: '~/plugins/vue-clipboard2', ssr: false }
  ],
  env: {
    baseUrl: 'http://gateway.dev.jingshonline.net'
  },
  server: {
    // port: 9527,
    open: true
  }

}

