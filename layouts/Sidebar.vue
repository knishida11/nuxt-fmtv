<template>
  <div>
    <div v-if="!user">
      <v-list-item link to="/login" nuxt>
        <v-list-item-action>
          <v-icon>mdi-login</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
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
    </div>
    <div v-else>
      <v-list-item
        :to="{
          name: 'id',
          params: {
            id: user.pageId,
          },
        }"
        nuxt
      >
        <v-list-item-action>
          <v-icon>mdi-account-outline</v-icon>
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
      <v-list-item link to="/settings" nuxt>
        <v-list-item-action>
          <v-icon>mdi-cog-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="scss" scoped></style>
