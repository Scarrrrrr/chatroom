import _this from '../main.js'
import chatkit from '../utils/chatkit';
// Helper function for displaying error messages
function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  async login({ commit }, loginParam) {
    try {
      commit('setError', '');
      commit('setLoading', true);
      const currentUser = await chatkit.connectUser(loginParam);
      if(!currentUser){
        return false
      }else{
        commit('setUser', {
          username: currentUser.username,
          id: currentUser._id
        });
        commit('setReconnect', false);
        commit('setLogin', true)
        return true;
      }
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false);
    }
  },

  async changeRoom({ commit }, roomId) {
    try {
      commit('setActiveRoom',  roomId );
    } catch (error) {
      handleError(commit, error)
    }
  },

  async getMessage({ commit }, roomId) {
    try{
      commit('setError', '')
      const messages = await chatkit.getMessage(roomId)
      console.log(messages)
      if(!messages){
        return false
      }else{
        commit('setMessages', [...messages])
        return true
      }
    }catch(error){
      handleError(commit, error)
      alert(error)
    }
  },

  async sendMessage({ commit }, message) {
    try {
      commit('setError', '')
      commit('setSending', true)
      const newMessage = await chatkit.sendMessage(message)
      if(newMessage) commit('addMessage',newMessage)
    } catch (error) {
      handleError(commit, error)
      alert(error)
    } finally {
      commit('setSending', false);
    }
  },

  async logout({ commit }) {
    commit('reset');
    _this.$cookies.remove('token')
    // chatkit.disconnectUser();
    window.localStorage.clear();
  }
}
