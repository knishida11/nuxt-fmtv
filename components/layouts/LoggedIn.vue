<template>
  <div>
    <v-list-item>
      <v-list-item-action>
        <img class="user_icon" :src="user.photoURL" />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ user.displayName }}
        </v-list-item-title>
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
    <nuxt-link to="/favorite" class="sidebar_link text-decoration-none">
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-eye-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Favorite</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </nuxt-link>
    <nuxt-link to="/watch" class="sidebar_link text-decoration-none">
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Watchlist</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </nuxt-link>
    <v-list-item link class="logout" @click="logout">
      <v-list-item-action>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LoggedIn',
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    async logout() {
      this.$fireAuth.signOut()
      this.$router.push('/')
    },
  },
}
</script>

<style lang="sass" scoped>
.user_icon
  width: 24px
  height: 24px

.logout
  position: static

  @media (min-width: 960px)
    bottom: 0
    position: fixed
    width: 100%
</style>
