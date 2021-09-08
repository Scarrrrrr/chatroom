import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    path: '/',
    name: 'homepage',
    meta: { title:"聊天室", requiresAuth: true },
    component: () => import("../views/room.vue")
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to.matched)
    document.title = to.matched[0].meta.title
    const userToken = router.app.$cookies.get('token')
    console.log('token: ' + userToken)
    if (userToken) {
      next()
    } else {
      document.title = "登录"
      next('/login')
    }
  } else {
    next()
  }
})

export default router