import { createRouter, createWebHistory } from "vue-router";

// #region 頁面
import CoachDetail from '../views/coaches/CoachDetail.vue';
import CoachesList from '../views/coaches/CoachesList.vue';
import CoachRegistration from '../views/coaches/CoachRegistration.vue';
import ContactCoach from '../views/requests/ContactCoach.vue';
import RequestsReceive from '../views/requests/RequestsReceive.vue';
import NotFound from '../views/NotFound.vue';
import UserAuth from '../views/auth/UserAuth.vue';
// #endregion
import store from '../store/index.js';

// #region Asynchronous Components(非同步元件, 預設不會載入, 需要時才下載), 不建議在routing使用
//import { defineAsyncComponent } from "vue";
//const CoachDetail = defineAsyncComponent(() => import('../views/coaches/CoachDetail.vue'));
//const CoachRegistration = defineAsyncComponent(() => import('../views/coaches/CoachRegistration.vue'));
//const ContactCoach = defineAsyncComponent(() => import('../views/requests/ContactCoach.vue'));
//const UserAuth =defineAsyncComponent(() => import('../views/auth/UserAuth.vue'));
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
        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestsReceive, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true }},
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(function(to, from, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    }else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches');
    }else{
        next();
    }
});

export default router;