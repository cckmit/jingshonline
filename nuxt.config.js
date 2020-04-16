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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1685422_wcss7jnfelr.css' }, // 项目生产环境图标库链接 每天晚上固定改动
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1685305_k0q2a3f4p69.css' } // 项目开发版图标库链接 随时改动
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070', height: '2px' },
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
    { src: '~/plugins/ant-design', ssr: false },
    { src: '~plugins/echarts', ssr: false },
    { src: '~plugins/filters', ssr: true },
    { src: '~utils/validate', ssr: false },
    { src: '~utils/index', ssr: false },
    { src: '~/plugins/vue-clipboard2', ssr: false },
    { src: '~/plugins/moment', ssr: true }
  ],
  env: {
    baseUrl: process.env.BASE_URL
  },
  server: {
    // port: 9527,
    open: true
  },
  // page transition
  transition: {
    name: 'layout',
    mode: 'out-in',
    beforeEnter(el) {
      console.log('Before enter...')
    }
  }

}

