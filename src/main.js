import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'
import axios from 'axios'
import router from './router'
import store from './store'
import VueChatScroll from 'vue-chat-scroll'
import VueSocketIO from 'vue-socket.io'
const $cookies = require('vue-cookies')
// 后台地址
axios.defaults.baseURL = 'http://localhost:8080/'
// 允许跨域携带数据
axios.defaults.withCredentials = true
// cookies相关
Vue.use($cookies)
// 全局注册，这样在其他组件中就能通过 this.$axios 来调用http服务
Vue.prototype.$axios = axios
// element-ui
Vue.use(ElementUI)
// vue-chat-scroll
Vue.use(VueChatScroll)

Vue.use(new VueSocketIO({
    debug: true,
    // 服务器端地址
    connection: 'http://localhost:8080',
    sockets:{
        connect(){
            console.log("connected")
        }
    },
    vuex:{
        store,
        // actionPrefix: 'SOCKET_',
        // mutationPrefix: 'SOCKET_'
    }
}))

var vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default vue