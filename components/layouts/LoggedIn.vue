<template>
  <div>
    <v-list-item>
      <v-list-item-action>
        <img class="userIcon" :src="user.photoURL" />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ user.displayName }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/" nuxt>
      <v-list-item-action>
        <v-icon>mdi-magnify</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Search</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/likes" nuxt>
      <v-list-item-action>
        <v-icon>mdi-heart-outline</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Likes</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item link to="/watch" nuxt>
      <v-list-item-action>
        <v-icon>mdi-eye-outline</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Watchlist</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

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
    ...mapGetters('user', ['user']),
  },
  methods: {
    async logout() {
      this.$fireAuth.signOut()
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.userIcon {
  width: 24px;
  height: 24px;
}

.logout {
  position: static;

  @media (min-width: 960px) {
    bottom: 0;
    position: fixed;
    width: 100%;
  }
}
</style>
