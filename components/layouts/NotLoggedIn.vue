<template>
  <div>
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
</template>

<script>
export default {
  name: 'NotLoggedIn',
}
</script>
