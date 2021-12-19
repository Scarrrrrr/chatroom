// import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import { axios } from '../utils/request'
import _this from '../main.js'
import moment from 'moment'
import store from '../store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null
let activeRoom = null
let messages = null
let newMessage = null

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }));
  store.commit('setUsers', members);
}

async function connectUser(loginParam) {
  await axios({
    url:"/login",
    method: "post",
    data:loginParam
  }).then(res=>{
    currentUser = res.user
  })
  return currentUser
}

async function subscribeToRoom(roomId) {
  store.commit('clearChatRoom');
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      onMessage: message => {
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
        });
      },
      onPresenceChanged: () => {
        setMembers();
      },
      onUserStartedTyping: user => {
        store.commit('setUserTyping', user.id)
      },
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null)
      }
    }
  });
  setMembers();
  return activeRoom;
}
async function sendMessage(text) {
  const param = {
    username:_this.$store.state.user.username,
    content:text,
    roomId:_this.$store.state.activeRoom,
    date:moment(new Date().getTime()).format('YYYY-MM-DD hh:mm:ss')
  }
  await axios({
    url:'/message/send',
    method:'post',
    data: param
  }).then(res=>{
    newMessage = param
  }).catch(err=>{
    alert(err)
  })
  return newMessage
}

async function getMessage(roomId){
  await axios({
    url:`/message/get?roomId=${roomId}`,
    method:"get"
  }).then(res=>{
    messages = res.messages
  }).catch(err=>{
    alert(err)
  })
  return messages
}

function disconnectUser() {
  currentUser.disconnect();
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser,
  getMessage
}
