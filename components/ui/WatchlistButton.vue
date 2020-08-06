<template>
  <span>
    <v-btn
      v-if="!isWatchlisted"
      @click="
        watchlist({
          id: movie.imdbID,
          title: movie.Title,
        })
      "
    >
      <slot name="watchlist" />
      <v-icon>mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn v-else @click="unWatchlist(movie.imdbID)">
      <slot name="watchlisted" />
      <v-icon>mdi-eye</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'WatchlistButton',
  props: {
    movie: {
      type: Object,
      default: null,
    },
    isWatchlisted: {
      type: Boolean,
      default: null,
    },
  },
  methods: {
    ...mapActions(['addToWatchlist', 'removeFromWatchlist']),
    watchlist(id) {
      this.addToWatchlist(id)
      this.$emit('isWatchlisted', true)
    },
    unWatchlist(id) {
      this.removeFromWatchlist(id)
      this.$emit('isWatchlisted', false)
    },
  },
}
</script>
