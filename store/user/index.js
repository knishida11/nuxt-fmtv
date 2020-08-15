import { db } from '~/firestore/db.js'

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
  CHANGE_STATE_DISPLAY_NAME(state, payload) {
    state.user.displayName = payload
  },
  CHANGE_STATE_PERSONAL_ID(state, payload) {
    state.user.pageId = payload
  },
}

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      ctx.commit('UNSET_USER')
    } else {
      db.collection('users')
        .doc(authUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            ctx.commit('SET_USER', doc.data())
          } else if (
            !doc.exists &&
            claims.firebase.sign_in_provider === 'google.com'
          ) {
            db.collection('users')
              .doc(authUser.uid)
              .set({
                displayName: authUser.displayName,
                uid: authUser.uid,
                email: authUser.email,
                pageId: authUser.uid,
              })
              .then(() => {
                db.collection('personal_pages').doc(authUser.uid).set({
                  uid: authUser.uid,
                })
              })
              .then(() => {
                ctx.commit('SET_USER', {
                  displayName: authUser.displayName,
                  uid: authUser.uid,
                  email: authUser.email,
                  pageId: authUser.uid,
                })
              })
          }
        })
    }
  },
  updateSearchHistory({ commit }, payload) {
    commit('UPDATE_SEARCH_HISTORY', payload)
  },
  changeStateDisplayName({ commit }, payload) {
    commit('CHANGE_STATE_DISPLAY_NAME', payload)
  },
  changeStatePersonalId({ commit }, payload) {
    commit('CHANGE_STATE_PERSONAL_ID', payload)
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
