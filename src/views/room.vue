<template>
  <div>
    <div v-if="!user">
      <login></login>
    </div>
    <div v-else>
      <div class="header">
        <nav-bar></nav-bar>
      </div>
      <div class="left-bar">
        <user-list></user-list>
      </div>
      <div class="main">
        <message-list></message-list>
      </div>  
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components:{
    NavBar: () => import('../components/NavBar.vue'),
    UserList: () => import('../components/UserList.vue'),
    MessageList: () => import('../components/MessageList.vue'),
    Login: ()=>import('./login.vue')
  },
  data(){
    return{
      token:this.$cookies.get('token'),
      // isLogin:this.$store.getters.isLogin
    }
  },
  computed:{
    ...mapState([
      'user'
    ])
  }
}
</script>

<style>

</style>