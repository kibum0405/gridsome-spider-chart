// main.js
import GridsomeLayout from '~/layouts/GridsomeLayout.vue';
import VuetifyLayout from '~/layouts/VuetifyLayout.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

// vue route 컴포넌트 
import User from './components/spider/User.vue';
import allGuide from './components/spider/allGuide.vue'

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
    
    router.addRoutes([
        {
            path: '/get-the-guide/:tabName/level:levelNumber',
            component: User,
            props: true,
        },
        {
            path: '/get-the-guide/reference-architecture',
            component: User,
            props: true,
        },
        {
            path: '/all-guide',
            component: allGuide,
            props: true,
        },
        {
            path: '/:path',
            name: 'User',
            component: User,
            props: true,
        },
    ])

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
