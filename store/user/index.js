export const state = () => ({
  user: null,
  searchHistory: '',
  apiKey: process.env.OMDB_API_KEY,
  imdbUrl: 'https://www.imdb.com/title/',
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  UNSET_USER(state) {
    state.user = null
  },
  UPDATE_SEARCH_HISTORY(state, payload) {
    state.searchHistory = payload
  },
}

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser }) => {
    if (!authUser) {
      ctx.commit('UNSET_USER')
    } else {
      const userInfo = {
        uid: authUser.uid,
        displayName: authUser.displayName,
      }
      ctx.commit('SET_USER', userInfo)
    }
  },
  updateSearchHistory({ commit }, payload) {
    commit('UPDATE_SEARCH_HISTORY', payload)
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
  apiKey: (state) => state.apiKey,
  imdbUrl: (state) => state.imdbUrl,
}
