<template>
  <div class="user-list">
    <h4>Existing Rooms</h4>
    <hr>
    <div class="users-box">
      <div @click="changeRoom(k)" class="single-user" v-for="(room,k) in rooms" :key="k">
        {{k}}
        {{ room.name }}
        {{ room.sex }}
        "active:"{{activeRoom==k?true:false}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'user-list',
  data(){
    return{
      current:0,
      rooms:[
        {
          name:"room1",
          sex:"male"
        },
        {
          name:"room2",
          sex:"female"
        },
        {
          name:"room3",
          sex:"female"
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'loading',
      'users',
      'activeRoom'
    ])
  },
  watch:{
    activeRoom(newVal, oldVal){
      console.log(newVal.roomId)
    }
  },
  methods: {
    statusColor(status) {
      return status === 'online' ? 'success' : 'warning'
    },
    ...mapActions([
      'changeRoom'
    ])
  }
}
</script>