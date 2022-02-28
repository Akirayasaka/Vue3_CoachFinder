import { createRouter, createWebHistory } from "vue-router";

// #region 頁面
import CoachDetail from '../views/coaches/CoachDetail.vue';
import CoachesList from '../views/coaches/CoachesList.vue';
import CoachRegistration from '../views/coaches/CoachRegistration.vue';
import ContactCoach from '../views/requests/ContactCoach.vue';
import RequestsReceive from '../views/requests/RequestsReceive.vue';
import NotFound from '../views/NotFound.vue';
// #endregion

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches'},
        { path: '/coaches', component: CoachesList },
        { 
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestsReceive },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

export default router;