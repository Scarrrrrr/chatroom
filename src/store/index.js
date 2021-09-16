import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// vuex-persist 确保vuex状态在页面重载或者刷新的还保存在本地
const vuexLocal = new VuexPersistence({
    storage:window.localStorage
})

export default new Vuex.Store({
    state:{

    },
    mutations,
    actions,
    getters:{

    },
    plugins:[
        vuexLocal.plugin
    ],
})