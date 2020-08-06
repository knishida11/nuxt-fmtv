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
        <v-img class="white--text align-end" height="400" :src="movie.Poster" />
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
export default {
  props: {
    searchResults: {
      type: Array,
      default: null,
    },
  },
}
</script>
