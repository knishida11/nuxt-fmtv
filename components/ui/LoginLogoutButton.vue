<template>
  <div>
    <v-btn v-if="!user" to="/login" nuxt small>
      Login
    </v-btn>
    <v-btn v-else @click="logout" small>
      Logout
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LoginLogoutButton',
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    async logout() {
      await this.$fireAuth.signOut()
      this.$router.push('/')
    },
  },
}
</script>
