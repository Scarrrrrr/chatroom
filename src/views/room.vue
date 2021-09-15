<template>
  <div>
    <div class="header">
      <h1>
        chatroom
      </h1>
    </div>
    <div class="outer">
      <div class="sidebar">list</div>
      <div class="main">
        <router-view></router-view>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      token:null
    }
  },
  mounted(){
    if(!this.token){
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>