import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { title:"聊天室" },
    component: () => import("../views/room.vue")
  },
  {
    path: '/register',
    name: 'register',
    meta: { title:"注册" },
    component: () => import("../views/register.vue")
  },
  {
    path: '*',
    meta: { title:"404 找不到界面" },
    component: () => import("../components/404.vue")
  }
]

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes
  })

export default router