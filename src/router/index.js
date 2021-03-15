import Vue from 'vue'
import VueRouter from 'vue-router'

import {userRoutes} from "@/modules/users";
import {productRoutes} from "@/modules/products";
import {authRoutes} from "@/modules/auth";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/products/list',
        meta: {
            title: 'Trang chủ',
            icon: 'dashboard',
            singleItem: true,
        }
    },
    ...productRoutes,
    ...userRoutes,
    ...authRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let token = localStorage.getItem('token');
    if (to.name !== 'Login' && !token) {
        next({ name: 'Login' });
    }
    else {
        next();
    }
})

export default router;
