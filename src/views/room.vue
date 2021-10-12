<template>
  <div>
    <el-container>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <user-list></user-list>
        </el-aside>
        <el-main>
          <message-list></message-list>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  components:{
    NavBar: () => import('../components/NavBar.vue'),
    UserList: () => import('../components/UserList.vue'),
    MessageList: () => import('../components/MessageList.vue')
  },
  data(){
    return{
      token:this.$cookies.get('token')
    }
  },
}
</script>

<style>

</style>