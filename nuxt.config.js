module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-circcus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'http://cdn.bootcss.com/strophe.js/1.2.8/strophe.min.js' }
    ]
  },
  /*
  ** Global CSS
  */
 css: [
    // { src: 'element-ui/lib/theme-chalk/index.css' },
    { src: '~assets/scss/base.scss', lang: 'scss' }
  ],
  /**
   * Add plugins
   */
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~components/inbox/core', ssr: false }
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'element-ui', 'email-validator', 'moment', 'localforage']
  }
}
