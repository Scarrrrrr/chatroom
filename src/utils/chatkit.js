// import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import { axios } from '../utils/request'
import _this from '../main.js'
import moment from 'moment'
import store from '../store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }));
  store.commit('setUsers', members);
}

async function connectUser(loginParam) {
//   const chatManager = new ChatManager({
//     instanceLocator: INSTANCE_LOCATOR,
//     tokenProvider: new TokenProvider({ url: TOKEN_URL }),
//     userId
//   });
  await axios({
    url:"/login",
    method: "post",
    data:loginParam
  }).then(res=>{
    currentUser = res.user
  })
  // currentUser = await chatManager.connect();
  return currentUser;
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
  // const messageId = await currentUser.sendMessage({
  //   text,
  //   roomId: activeRoom.id
  // });
  // return messageId;
  axios({
    url:'/message/send',
    method:'post',
    data:{
      username:_this.state.user.username,
      text:text
    }
  }).then(res=>{
    console.log(res)
  }).catch(err=>{
    alert(err)
  })
}

export function isTyping(roomId) {
  currentUser.isTypingIn({ roomId });
}

function disconnectUser() {
  currentUser.disconnect();
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser
}
