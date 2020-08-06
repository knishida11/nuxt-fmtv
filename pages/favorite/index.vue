<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            IMDb
          </th>
          <th class="text-left">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in favoriteMovies" :key="movie.imdbID">
          <td>
            <nuxt-link
              :to="{
                name: 'details-id',
                params: {
                  id: movie.imdbID,
                },
              }"
            >
              {{ movie.title }}
            </nuxt-link>
          </td>
          <td>
            <a
              :href="imdbUrl + movie.imdbID"
              target="_blank"
              rel="noopener"
              class="text-decoration-none"
            >
              <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
            </a>
          </td>
          <td>
            <v-icon @click="removeFromFavorite(movie.imdbID)">
              mdi-trash-can-outline
            </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'Favorite',
  middleware: 'auth',
  data() {
    return {
      favoriteMovies: [],
      unsubscribe: null,
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState(['apiKey', 'imdbUrl']),
  },
  created() {
    this.unsubscribe = this.$fireStore
      .collection(`users/${this.user.uid}/favorite`)
      .onSnapshot((querySnapshot) => {
        this.favoriteMovies = []
        querySnapshot.forEach((doc) => {
          this.favoriteMovies.push({
            title: doc.data().title,
            imdbID: doc.data().imdbID,
          })
        })
      })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    ...mapActions(['removeFromFavorite']),
  },
}
</script>
