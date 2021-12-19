<template>
  <div class="user-list">
    <div class="rooms-title">Existing Rooms</div>
    <div class="users-box">
      <div @click="changeRoom(k)" :class="activeRoom==k?'single-room selected':'single-room'" v-for="(room,k) in rooms" :key="k">
        <div class="avatar">
          <el-image style="width:4em;height:4em;" fit="cover" :src="room.avatar" alt="群头像" />
        </div>
        <div class="room-name">
          {{ room.name }}
        </div>
        <div class="room-latest">
          {{ room.latest}}
        </div>
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
          name:"第一间聊天室",
          avatar:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          latest:"你好，好啊"
        },
        {
          name:"第二间聊天室",
          avatar:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          latest:"你好，好啊"
        },
        {
          name:"第三间聊天室",
          avatar:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          latest:"你好，好啊"
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