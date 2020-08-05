<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <not-logged-in v-if="!user" />
        <logged-in v-else />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/" class="text-decoration-none white--text">
          FMTV
        </nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoggedIn from '~/components/header/LoggedIn.vue'
import NotLoggedIn from '~/components/header/NotLoggedIn.vue'
export default {
  name: 'Header',
  components: {
    LoggedIn,
    NotLoggedIn,
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
}
</script>
