<template>
  <div class="message-list">
    <div class="rooms-title">Messages In Room {{activeRoom}}</div>
    <hr>
    <div id="chat-messages" class="message-group">
      <div class="message" v-for="(message, index) in messages" :key="index">
        <div class="clearfix">
          <h4 class="message-title">{{ message.name }}</h4>
          <small class="text-muted float-right">@{{ message.username }}</small>
        </div>
        <p class="message-text">
          {{ message.text }}
        </p>
        <div class="clearfix">
          <small class="text-muted float-right">{{ message.date }}</small>
        </div>
      </div>
    </div>
    <div class="chat-bottom-box">
      <el-input
        class="send-input"
        placeholder="Enter Message"
        v-model="messageToSend">
      </el-input>
      <el-button @click="submit" class="send-button">发送</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'message-list',
  data(){
    return{
      messageToSend:''
    }
  },
  computed: {
    ...mapState([
      'user',
      'messages',
      'activeRoom',
    ])
  },
  methods:{
    ...mapActions([
      'sendMessage'
    ]),
    submit(){
      console.log(this.messageToSend)
      this.sendMessage(this.messageToSend)
      this.messageToSend = ""
    },
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.sendMessage(this.messageToSend)
        this.messageToSend = ""
      }
    },
  },
  mounted(){
    
  }
}
</script>

<style>
.message-list {
  margin-bottom: 15px;
  padding-right: 15px;
}
.message-group {
  height: 60vh !important;
  overflow-y: scroll;
}
.message {
  border: 1px solid lightblue;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}
.message-title {
  font-size: 1rem;
  display:inline;
}
.message-text {
  color: gray;
  margin-bottom: 0;
}
.user-typing {
  height: 1rem;
}
</style>