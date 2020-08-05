<template>
  <div v-if="movie">
    <v-row class="grey lighten-5 rounded py-2 px-1">
      <v-col cols="12" sm="4" class="text-center">
        <img :src="movie.Poster" />
        <div v-if="user" class="mt-1">
          <v-btn
            v-if="!isLiked"
            class="ml-2"
            @click="
              like({
                id: movie.imdbID,
                title: movie.Title,
              })
            "
          >
            Like
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <v-btn v-else class="ml-2" @click="unLike(movie.imdbID)">
            Liked
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn
            v-if="!isWatchlisted"
            class="ml-2"
            @click="
              watchlist({
                id: movie.imdbID,
                title: movie.Title,
              })
            "
          >
            Watchlist
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
          <v-btn v-else class="ml-2" @click="unWatchlist(movie.imdbID)">
            Watchlisted
            <v-icon>mdi-eye</v-icon>
          </v-btn>
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
        <nuxt-link to="/" class="text-decoration-none">
          <v-btn color="secondary">
            Back to Search
          </v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Details',
  data() {
    return {
      movie: null,
      isLiked: false,
      isWatchlisted: false,
    }
  },
  computed: {
    ...mapState(['apiKey', 'imdbUrl']),
    ...mapGetters(['user']),
  },
  created() {
    this.fetchMovieData(this.$route.params.id)
  },
  methods: {
    ...mapActions([
      'addToFavorite',
      'removeFromFavorite',
      'addToWatchlist',
      'removeFromWatchlist',
    ]),
    like(id) {
      this.addToFavorite(id)
      this.isLiked = true
    },
    unLike(id) {
      this.removeFromFavorite(id)
      this.isLiked = false
    },
    watchlist(id) {
      this.addToWatchlist(id)
      this.isWatchlisted = true
    },
    unWatchlist(id) {
      this.removeFromWatchlist(id)
      this.isWatchlisted = true
    },
    async fetchMovieData(id) {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${this.apiKey}&i=${id}`
        )
        this.movie = res.data
        this.$fireStore
          .collection(`users/${this.user.uid}/favorite`)
          .doc(this.movie.imdbID)
          .get()
          .then((doc) => {
            this.isLiked = doc.exists
          })
        this.$fireStore
          .collection(`users/${this.user.uid}/watch`)
          .doc(this.movie.imdbID)
          .get()
          .then((doc) => {
            this.isWatchlisted = doc.exists
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
