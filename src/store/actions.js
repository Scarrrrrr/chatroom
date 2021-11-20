import _this from '../main.js'
import chatkit from '../utils/chatkit';
// Helper function for displaying error messages
function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  async login({ commit, state }, loginParam) {
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
      // Save list of user's rooms in store
      // const rooms = currentUser.rooms.map(room => ({
      //   id: room.id,
      //   name: room.name
      // }))
      // commit('setRooms', rooms);

      // Subscribe user to a room
      // const activeRoom = state.activeRoom || rooms[0]; // pick last used room, or the first one
      // commit('setActiveRoom', {
      //   id: activeRoom.id,
      //   name: activeRoom.name
      // });
      // await chatkit.subscribeToRoom(activeRoom.id);
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false);
    }
  },
  async changeRoom({ commit }, roomId) {
    try {
      // const { id, name } = await chatkit.subscribeToRoom(roomId);
      commit('setActiveRoom',  roomId );
    } catch (error) {
      handleError(commit, error)
    }
  },
  async sendMessage({ commit }, message) {
    try {
      commit('setError', '');
      commit('setSending', true);
      return await chatkit.sendMessage(message);
    } catch (error) {
      handleError(commit, error)
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
