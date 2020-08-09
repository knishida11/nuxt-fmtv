export const state = () => ({
  user: null,
  searchHistory: '',
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
    state.searchHistory = payload
  },
}

export const actions = {
  updateSearchHistory({ commit }, payload) {
    commit('UPDATE_SEARCH_TEXT', payload)
  },
  addToLikes({ getters }, payload) {
    this.$fireStore
      .collection(`users/${getters.user.uid}/likes`)
      .doc(payload.id)
      .set({
        imdbID: payload.id,
        title: payload.title,
      })
  },
  removeFromLikes({ getters }, payload) {
    this.$fireStore
      .collection(`users/${getters.user.uid}/likes`)
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
  searchHistory: (state) => state.searchHistory,
}
