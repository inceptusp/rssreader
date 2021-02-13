module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pwa: {
    name: 'RSS Reader',
    themeColor: '#F5F5F5',
    msTileColor: '#F5F5F5',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      background_color: '#FFFFFF',
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait'
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
}
