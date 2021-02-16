import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
