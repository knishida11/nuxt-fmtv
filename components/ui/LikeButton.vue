<template>
  <span>
    <v-btn
      v-if="!isLiked"
      small
      @click="
        like({
          id: imdbID,
          title: title,
        })
      "
    >
      <slot name="like" />
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>
    <v-btn v-else small @click="unLike(imdbID)">
      <slot name="liked" />
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'FavoriteButton',
  props: {
    imdbID: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isLiked: null,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  created() {
    this.$fireStore
      .collection(`users/${this.user.uid}/favorite`)
      .doc(this.imdbID)
      .get()
      .then((doc) => {
        this.isLiked = doc.exists
      })
  },
  methods: {
    ...mapActions(['addToFavorite', 'removeFromFavorite']),
    like(id) {
      this.addToFavorite(id)
      this.isLiked = true
    },
    unLike(id) {
      this.removeFromFavorite(id)
      this.isLiked = false
    },
  },
}
</script>
