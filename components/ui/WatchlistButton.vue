<template>
  <span>
    <v-btn
      v-if="!isWatchlisted"
      @click="
        watchlist({
          id: imdbID,
          title: title,
        })
      "
    >
      <slot name="watchlist" />
      <v-icon>mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn v-else @click="unWatchlist(imdbID)">
      <slot name="watchlisted" />
      <v-icon>mdi-eye</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'WatchlistButton',
  props: {
    imdbID: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isWatchlisted: null,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  created() {
    this.$fireStore
      .collection(`users/${this.user.uid}/watch`)
      .doc(this.imdbID)
      .get()
      .then((doc) => {
        this.isWatchlisted = doc.exists
      })
  },
  methods: {
    ...mapActions(['addToWatchlist', 'removeFromWatchlist']),
    watchlist(id) {
      this.addToWatchlist(id)
      this.isWatchlisted = true
    },
    unWatchlist(id) {
      this.removeFromWatchlist(id)
      this.isWatchlisted = false
    },
  },
}
</script>
