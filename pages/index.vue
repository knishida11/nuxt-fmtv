<template>
  <div>
    <search-bar
      :did-search="didSearch"
      @searchResults="searchResults = $event"
      @didSearch="didSearch = $event"
    />
    <search-results :search-results="searchResults" />
  </div>
</template>

<script>
import SearchBar from '~/components/pages/SearchBar.vue'
import SearchResults from '~/components/pages/SearchResults.vue'
export default {
  name: 'Home',
  components: {
    SearchBar,
    SearchResults,
  },
  data() {
    return {
      didSearch: false,
      searchResults: null,
    }
  },
}
</script>
