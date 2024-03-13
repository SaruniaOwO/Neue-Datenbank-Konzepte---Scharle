import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import GemerkteRezeptePage from './Pages/GemerkteRezeptePage.vue';
import UebersichtPage from './Pages/UebersichtPage.vue';
import RezeptDetailPage from './Pages/RezeptDetailPage.vue'; 

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/Uebersicht',
            component: UebersichtPage,
        },
        {
            path: '/Gemerkterezepte',
            component: GemerkteRezeptePage,
        },
        {
            path: '/Uebersicht/:recipeId',
            component: RezeptDetailPage,
        }
    ]
});

createApp(App)
    .use(router)
    .mount('#app')
