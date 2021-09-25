import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// vuex-persist 确保在页面重载或者刷新时vuex状态还保存在本地
const vuexLocal = new VuexPersistence({
    storage:window.localStorage
})

const store = new Vuex.Store({
    state:{
        loading: false,
        sending: false,
        error: null,
        user: null,
        reconnect: false,
        activeRoom: null,
        rooms: [],
        users: [],
        messages: [],
        userTyping: null
    },
    mutations,
    actions,
    getters:{
        isLogin: state => state.user? true: false,
        hasError: state => state.error ? true : false
    },
    plugins:[
        vuexLocal.plugin
    ],
})

export default store