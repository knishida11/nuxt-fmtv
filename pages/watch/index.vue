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
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in watchMovies" :key="movie.imdbID">
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
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Watchlist',
  middleware: 'auth',
  data() {
    return {
      watchMovies: [],
      unsubscribe: null,
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState(['apiKey', 'imdbUrl']),
  },
  created() {
    this.unsubscribe = this.$fireStore
      .collection(`users/${this.user.uid}/watch`)
      .onSnapshot((querySnapshot) => {
        this.watchMovies = []
        querySnapshot.forEach((doc) => {
          this.watchMovies.push({
            title: doc.data().title,
            imdbID: doc.data().imdbID,
          })
        })
      })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
}
</script>
