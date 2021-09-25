<template>
  <div class="message-form ld-over">
    <small class="text-muted">@{{ user.username }}</small>
    <el-form @submit.prevent="onSubmit" class="ld-over" v-bind:class="{ running: sending }">
      <div class="ld ld-ring ld-spin"></div>
      <div variant="danger" :show="hasError">{{ error }} </div>
      <el-form-item>
        <el-form-input id="message-input"
                      type="text"
                      v-model="message"
                      placeholder="Enter Message"
                      autocomplete="off"
                      required>
        </el-form-input>
      </el-form-item>
      <div class="clearfix">
        <el-button type="submit" variant="primary" class="float-right">
          Send
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'message-form',
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState([
      'user',
      'sending',
      'error',
      'activeRoom'
    ]),
    ...mapGetters([
      'hasError'
    ])
  }
}
</script>