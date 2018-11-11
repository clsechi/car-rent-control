/* eslint-disable */
module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'Firebase',
      'Logger',
      'Vuelidate',
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      'fontawesome',
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemSeparator',
        'QItemTile',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardActions',
        'QField',
        'QInput',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QDatetime',
        'QPopover',
        'QInnerLoading',
        'QSpinner',
        'QPopupEdit',
      ],
      directives: [
        'Ripple',
        'CloseOverlay',
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      i18n: 'pt-br',
    },
    // animations: 'all',
    animations: [
      'fadeInUp',
      'fadeIn',
      'fadeOut',
    ],
    ssr: {
      pwa: false
    },
    preFetch: true,
    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        importWorkboxFrom: 'cdn',
        exclude: [/\/icons\//, 'manifest.json'],
      },
      manifest: {
        name: 'Controle de Aluguel',
        short_name: 'Controle Aluguel',
        description: 'Tenha controle do aluguel do seu carro, para quem trabalha com Uber/99',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            'src': 'statics/icons/android-icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          // {
          //   'src': 'statics/icons/icon-256x256.png',
          //   'sizes': '256x256',
          //   'type': 'image/png'
          // },
          // {
          //   'src': 'statics/icons/icon-384x384.png',
          //   'sizes': '384x384',
          //   'type': 'image/png'
          // },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    }
  }
}
