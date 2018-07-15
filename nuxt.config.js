module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '商标查询 - 商标注册查询 - 中国商标网 - 商标之家官网',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '中国商标网,商标注册,商标局,中国商标网商标查询,商标查询,商标注册查询,商标查询官方网站' },
      {
        hid: 'description', 
        name: 'description', 
        content: '商标之家，商标之家注册，商标注册流程，商标查询,驰名商标查询,商标局商标查询,商标,免费商标注册,商标交易,商标注册,商标中介,商标法律服务,商标服务,商标担保注册,郑州商标注册,商标注册申请，商标检索，版权登记，软著申请，专利申请' 
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    { type: 'scss', src: '~/assets/scss/style.scss' }
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'spin']
  },
  serverMiddleware: [
    // API middleware
  ],
  plugins: [
    '~/plugins/widgets'
  ]
}
