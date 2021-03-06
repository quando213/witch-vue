import Vue from 'vue'
import VueRouter from 'vue-router'

import {productRoutes} from "@/modules/products";
import {categoryRoutes} from "@/modules/categories";
import {userRoutes} from "@/modules/users";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/products'
    },
    ...productRoutes,
    ...categoryRoutes,
    ...userRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
