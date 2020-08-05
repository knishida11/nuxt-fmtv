<template>
  <div>
    <v-list-item link @click="login">
      <v-list-item-action>
        <v-icon>mdi-login</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <nuxt-link to="/" class="sidebar_link text-decoration-none">
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NotLoggedIn',
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    login() {
      const googleAuthProvider = new this.$fireAuthObj.GoogleAuthProvider()
      this.$fireAuth.signInWithRedirect(googleAuthProvider)
    },
  },
}
</script>
