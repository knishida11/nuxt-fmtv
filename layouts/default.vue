<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '~/layouts/header.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Default',
  components: {
    Header,
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="scss">
img {
  max-width: 100%;
}

// This targets iPad Pro. the container from Vuetify is too narrow for iPad Pro.
@media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
  .container {
    max-width: 100%;
  }
}

// These disable the ripple effect(click) from Vuetify in all files
.v-btn:before {
  opacity: 0 !important;
}

.v-ripple__container {
  opacity: 0 !important;
}
</style>
