// plugins/vuetify.js
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

export default function (Vue, options) {
  Vue.use(Vuetify);

  const vuetify = new Vuetify({
    // ... Vuetify 옵션
  });

  options.appOptions.vuetify = vuetify;
}
