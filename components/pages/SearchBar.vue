<template>
  <v-form
    @keyup="didSearch = false"
    @submit.prevent="getMovieData(searchText), blur()"
  >
    <v-row class="align-center">
      <v-col cols="12" sm="10" class="pb-0">
        <v-text-field
          ref="input"
          v-model.trim="searchText"
          label="Search for movie and TV shows"
          required
        />
      </v-col>
      <v-col cols="12" sm="2" class="text-center py-0">
        <v-btn color="primary" type="submit">
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'SearchBar',
  computed: {
    searchText: {
      get() {
        return this.$store.getters.searchText
      },
      set(searchText) {
        this.$store.dispatch('updateSearchText', searchText)
      },
    },
    ...mapState(['apiKey', 'imdbUrl']),
  },
  created() {
    this.$emit('didSearch', false)
  },
  mounted() {
    if (this.searchText) {
      this.getMovieData(this.searchText)
      this.$emit('didSearch', true)
    }
    window.scrollTo(0, 0)
  },
  methods: {
    async getMovieData(text) {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${text}`
        )
        this.$emit('searchResults', response.data.Search)
        this.$emit('didSearch', true)
      } catch (error) {
        alert(error)
      }
    },
    blur() {
      this.$refs.input.blur()
    },
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>
