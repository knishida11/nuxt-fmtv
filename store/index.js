export const state = () => ({
  user: null,
  searchText: '',
  apiKey: process.env.OMDB_API_KEY,
  imdbUrl: 'https://www.imdb.com/title/',
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser }) => {
    if (!authUser) {
      state.user = null
    } else {
      const { displayName, photoURL, uid } = authUser
      state.user = { displayName, photoURL, uid }
    }
  },
  UPDATE_SEARCH_TEXT(state, payload) {
    state.searchText = payload
  },
}

export const actions = {
  updateSearchText({ commit }, payload) {
    commit('UPDATE_SEARCH_TEXT', payload)
  },
  addToFavorite({ getters }, payload) {
    this.$fireStore
      .collection(`users/${getters.user.uid}/favorite`)
      .doc(payload.id)
      .set({
        imdbID: payload.id,
        title: payload.title,
      })
  },
  removeFromFavorite({ getters }, payload) {
    this.$fireStore
      .collection(`users/${getters.user.uid}/favorite`)
      .doc(payload)
      .delete()
  },
  addToWatchlist({ getters }, payload) {
    this.$fireStore
      .collection(`users/${getters.user.uid}/watch`)
      .doc(payload.id)
      .set({
        imdbID: payload.id,
        title: payload.title,
      })
  },
  removeFromWatchlist({ getters }, payload) {
    this.$fireStore
      .collection(`users/${getters.user.uid}/watch`)
      .doc(payload)
      .delete()
  },
}

export const getters = {
  user: (state) => state.user,
  searchText: (state) => state.searchText,
  favorite: (state) => (state.favorite ? state.favorite : null),
  watch: (state) => (state.watch ? state.watch : null),
}
