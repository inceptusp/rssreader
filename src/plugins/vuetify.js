import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/es5/locale/pt';
import en from 'vuetify/es5/locale/en';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { en, pt },
        current: navigator.languages[0].split("-")[0],
    },
});
