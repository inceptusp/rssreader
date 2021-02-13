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
  }
}
