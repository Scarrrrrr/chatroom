import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { title:"聊天室", requiresAuth: true },
    component: () => import("../views/room.vue")
  },
  {
    path: '/register',
    name: 'register',
    meta: { title:"注册", requiresAuth:false },
    component: () => import("../views/register.vue")
  },
  {
    path: '/login',
    name: 'login',
    meta: { title:"登录", requiresAuth:false },
    component: () => import("../views/login.vue")
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

router.beforeEach((to, from, next) => {
  const userToken = router.app.$cookies.get('token')
  if (to.meta.requiresAuth) {
    if (!userToken) {
      document.title = "登录"
      next('/login')
    }
  } 
  next()
})

export default router