import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import UebersichtPage from './Pages/UebersichtPage.vue';
import RezeptDetailPage from './Pages/RezeptDetailPage.vue'; 
import RezeptErstellerPage from './Pages/RezeptErstellerPage.vue';
import SearchResults from './components/SearchResults.vue';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/Uebersicht',
            name: 'Uebersicht',
            component: UebersichtPage,
        },
        {
            path: '/rezept-detail/:recipeId',
            name: 'RezeptDetail',
            component: RezeptDetailPage,
            props: true,
        },
        {
            path: '/RezeptErsteller',
            name: 'RezeptErsteller',
            component: RezeptErstellerPage,
        },
        {
            path: '/search-results',
            name: 'SearchResults',
            component: SearchResults,
            props: (route) => ({ query: route.query.query }),
        },
    ]
});

createApp(App)
    .use(router)
    .mount('#app')
