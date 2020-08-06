<template>
  <v-row class="align-top">
    <v-col
      v-for="movie in searchResults"
      :key="movie.imdbID"
      cols="12"
      sm="6"
      md="3"
      class="d-flex"
    >
      <v-card class="mx-auto movie_card">
        <div class="card_upper_part">
          <v-img
            class="white--text align-end"
            height="400"
            :src="movie.Poster"
          />
          <like-button
            v-if="user"
            class="like_button"
            :title="movie.Title"
            :imdb-i-d="movie.imdbID"
          />
          <watchlist-button
            v-if="user"
            class="watch_button"
            :title="movie.Title"
            :imdb-i-d="movie.imdbID"
          />
        </div>
        <div class="text-center">
          <nuxt-link
            :to="{
              name: 'details-id',
              params: {
                id: movie.imdbID,
              },
            }"
            class="text-decoration-none"
          >
            <v-btn class="mt-3" color="primary">
              View Details
            </v-btn>
          </nuxt-link>
        </div>
        <v-card-subtitle class="pb-0">
          {{ movie.Year }}
        </v-card-subtitle>
        <v-card-text class="text--primary">
          <div>{{ movie.Title }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import LikeButton from '~/components/ui/LikeButton.vue'
import WatchlistButton from '~/components/ui/WatchlistButton.vue'
export default {
  components: {
    LikeButton,
    WatchlistButton,
  },
  props: {
    searchResults: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
}
</script>

<style lang="sass" scoped>
.movie_card
  width: 90%

  @media (min-width: 600px)
    width: 100%

.card_upper_part
  position: relative

.like_button
  position: absolute
  bottom: 2%
  right: 24%

.watch_button
  position: absolute
  bottom: 2%
  right: 3%
</style>
