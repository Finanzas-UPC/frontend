import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import store from './store';
import LoginComponent from '../../security/pages/Login.component.vue';
import SignUpComponent from '../../security/pages/SignUp.component.vue';
import HomeComponent from '../../bond/pages/Home.component.vue';
import BondDetailComponent from '../../bond/pages/BondDetail.component.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
    { path: '/login', component: LoginComponent },
    { path: '/signup', component: SignUpComponent },
    { path: '/home', component: HomeComponent, meta: { requiresAuth: true } },
    { path: '/bond/details/:id', component: BondDetailComponent, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    if (to.meta.requiresAuth) {
        if (store.getters.isAuthenticated) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
})

export default router;