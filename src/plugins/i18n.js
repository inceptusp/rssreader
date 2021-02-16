import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    pt: {
       "Welcome": "Bem-vindo(a)"
    }
}

export default new VueI18n({
    locale: navigator.languages[0].split("-")[0],
    fallbackLocale: "en",
    formatFallbackMessages: true,
    messages: messages,
})