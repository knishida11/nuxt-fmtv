<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <not-logged-in v-if="!user" />
        <logged-in v-else />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dense>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="title_bar d-flex justify-space-between">
        <nuxt-link to="/" class="text-decoration-none white--text">
          FMTV
        </nuxt-link>
        <login-logout-button />
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoggedIn from '~/components/layouts/LoggedIn.vue'
import NotLoggedIn from '~/components/layouts/NotLoggedIn.vue'
import LoginLogoutButton from '~/components/ui/LoginLogoutButton.vue'
export default {
  name: 'Header',
  components: {
    LoggedIn,
    NotLoggedIn,
    LoginLogoutButton,
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="scss">
.title_bar {
  width: 100%;
}
</style>
