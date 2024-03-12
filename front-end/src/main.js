import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import GemerkteRezeptePage from './Pages/GemerkteRezeptePage.vue';
import UebersichtPage from './Pages/UebersichtPage.vue';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/Uebersicht',
        component: UebersichtPage,
    },{
        path: '/Gemerkterezepte',
        component: GemerkteRezeptePage,
    }]
});

createApp(App)
    .use(router)
    .mount('#app')
