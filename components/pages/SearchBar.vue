<template>
  <div :class="{ searchBar: !didSearch }">
    <v-form
      :class="{ searchBar_form: !didSearch }"
      @submit.prevent="getMovieData(searchTerm), blur()"
    >
      <v-row class="align-center">
        <v-col cols="12" sm="10" class="pb-0">
          <v-text-field
            ref="input"
            v-model.trim="searchTerm"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'SearchBar',
  props: {
    didSearch: {
      type: Boolean,
    },
  },
  data() {
    return {
      searchTerm: '',
    }
  },
  computed: {
    ...mapGetters('user', ['searchHistory', 'apiKey']),
  },
  created() {
    if (this.searchHistory) {
      this.searchTerm = this.searchHistory
      this.getMovieData(this.searchHistory)
      this.$emit('didSearch', true)
    }
    window.scrollTo(0, 0)
  },
  methods: {
    ...mapActions('user', ['updateSearchHistory']),
    async getMovieData(text) {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${text}`
        )
        this.updateSearchHistory(text)
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

<style lang="scss" scoped>
.searchBar {
  position: relative;
  height: 100vh;

  &_form {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}
</style>
