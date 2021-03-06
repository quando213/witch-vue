import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {vi} from "@/services/lang/vi";
Vue.use(VueI18n);
const messages = {
    vi
}

export const i18n = new VueI18n({
    locale: 'vi', // set locale
    messages, // set locale messages
});

