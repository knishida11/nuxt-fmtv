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
      <v-lazy class="mx-auto movieCard d-flex">
        <v-card>
          <div class="cardUpperPart">
            <v-img
              class="white--text align-end"
              height="400"
              :src="movie.Poster"
            />
            <like-button
              v-if="user"
              class="userActionButton _2ndFromRight"
              :small="true"
              :title="movie.Title"
              :imdb-i-d="movie.imdbID"
            />
            <watchlist-button
              v-if="user"
              class="userActionButton"
              :small="true"
              :title="movie.Title"
              :imdb-i-d="movie.imdbID"
            />
          </div>
          <div class="text-center">
            <v-btn
              class="mt-3"
              color="primary"
              :to="{
                name: 'details-id',
                params: {
                  id: movie.imdbID,
                },
              }"
              nuxt
            >
              View Details
            </v-btn>
          </div>
          <v-card-subtitle class="pb-0">
            {{ movie.Year }}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>{{ movie.Title }}</div>
          </v-card-text>
        </v-card>
      </v-lazy>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import LikeButton from '~/components/ui/LikeButton.vue'
import WatchlistButton from '~/components/ui/WatchlistButton.vue'
export default {
  name: 'SearchResults',
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
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="scss" scoped>
.movieCard {
  width: 90%;

  @media (min-width: 600px) {
    width: 100%;
  }
}

.cardUpperPart {
  position: relative;
}

.userActionButton {
  position: absolute;
  bottom: 2%;
  right: 8px;

  &._2ndFromRight {
    right: 65px;
  }
}
</style>
