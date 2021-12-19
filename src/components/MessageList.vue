<template>
  <div class="message-list">
    <div class="rooms-title">Messages In Room {{activeRoom}}</div>
    <div id="chat-messages" class="message-group">
      <div class="message" v-for="(message, index) in messages" :key="index">
        <div class="clearfix">
          <h4 class="message-title">{{ message.name }}</h4>
          <small class="text-muted float-right">@{{ message.username }}</small>
        </div>
        <p class="message-text">
          {{ message.content }}
        </p>
        <div class="clearfix">
          <small class="text-muted float-right">{{ message.date }}</small>
        </div>
      </div>
    </div>
    <div class="chat-bottom-box">
      <el-input
        class="send-input"
        @keyup.enter.native="handleKeyUp"
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
      'sendMessage',
      'getMessage'
    ]),
    submit(){
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
  watch:{
    "$store.state.activeRoom":{
      deep:true,
      handler:function(newVal){
        this.getMessage(newVal)
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar{
  width:.5em;
  background-color: white;
}
::-webkit-scrollbar-thumb{
  background-color: rgb(36, 36, 31);
  border-radius: .3em;
}
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