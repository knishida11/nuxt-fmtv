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
    ...mapGetters(['user']),
  },
}
</script>

<style lang="sass">
img
  max-width: 100%
</style>
