<template>
  <div class="user-list">
    <h4>Online Users</h4>
    <hr>
    <div>
      <div v-for="user in users" :key="user.username">
        {{ user.name }}
        <b-badge v-if="user.presence"
        :variant="statusColor(user.presence)"
        pill>
        {{ user.presence }}</b-badge>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'user-list',
  computed: {
    ...mapState([
      'loading',
      'users'
    ])
  },
  methods: {
    statusColor(status) {
      return status === 'online' ? 'success' : 'warning'
    }
  }
}
</script>