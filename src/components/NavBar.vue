<template>
  <div id="chat-navbar" toggleable="md" type="dark" variant="info">
    <span href="#">
      Vue Chat
    </span>
    <span>{{ user.username }} | </span>
    <span class="logout" @click="quit">Logout</span>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapState([
      'user',
    ])
  },
  methods:{
    ...mapActions([
      'logout'
    ]),
    quit(){
      this.logout()
      this.$router.go(0)
    }
  },
}
</script>

<style>
  #chat-navbar {
    margin-bottom: 15px;
  }
</style>