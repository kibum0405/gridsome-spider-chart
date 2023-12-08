// main.js
import GridsomeLayout from '~/layouts/GridsomeLayout.vue';
import VuetifyLayout from '~/layouts/VuetifyLayout.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

export default function (Vue, { appOptions, router, head, isClient }) {
  Vue.use(Vuetify);

  const vuetify = new Vuetify({
    // Vuetify 옵션을 여기에 추가할 수 있습니다.
  });

  // Vue 인스턴스 옵션에 vuetify 추가
  appOptions.vuetify = vuetify;

  // 기본 및 Vuetify 레이아웃을 글로벌 컴포넌트로 등록
  Vue.component('GridsomeLayout', GridsomeLayout);
  Vue.component('VuetifyLayout', VuetifyLayout);

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    });
    next();
  });

  // appOptions 객체를 수정하여 반환할 필요가 없음
}
