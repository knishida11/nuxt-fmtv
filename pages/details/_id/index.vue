<template>
  <div v-if="movie">
    <v-row class="grey lighten-5 rounded py-2 px-1">
      <v-col cols="12" sm="4" class="text-center">
        <img :src="movie.Poster" />
        <div v-if="user" class="mt-1">
          <like-button :title="movie.Title" :imdb-i-d="movie.imdbID">
            <template v-slot:like>
              Like
            </template>
            <template v-slot:liked>
              Liked
            </template>
          </like-button>
          <watchlist-button :title="movie.Title" :imdb-i-d="movie.imdbID">
            <template v-slot:watchlist>
              Watchlist
            </template>
            <template v-slot:watchlisted>
              Watchlisted
            </template>
          </watchlist-button>
        </div>
      </v-col>
      <v-col cols="12" sm="8">
        <h1 class="mt-3">
          {{ movie.Title }}
          <v-btn
            :href="imdbUrl + movie.imdbID"
            target="_blank"
            rel="noopener"
            color="primary"
            small
          >
            View on IMDb
          </v-btn>
        </h1>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Released:
                {{ movie.Released }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                IMDb Rating:
                {{ movie.imdbRating }} / 10
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Director:
                {{ movie.Director }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Main Actors:
                {{ movie.Actors }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <h2 class="mt-4">
          Plot
        </h2>
        <p class="white py-3 px-3 rounded">
          {{ movie.Plot }}
        </p>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn color="secondary" to="/" nuxt>
          Back to Search
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import LikeButton from '~/components/ui/LikeButton.vue'
import WatchlistButton from '~/components/ui/WatchlistButton'

export default {
  name: 'Details',
  components: {
    LikeButton,
    WatchlistButton,
  },
  data() {
    return {
      movie: null,
      isWatchlisted: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'apiKey', 'imdbUrl']),
  },
  created() {
    this.fetchMovieData(this.$route.params.id)
  },
  methods: {
    async fetchMovieData(id) {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${this.apiKey}&i=${id}`
        )
        this.movie = res.data
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
