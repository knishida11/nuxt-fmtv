<template>
  <span>
    <v-btn
      v-if="!isLiked"
      @click="
        like({
          id: movie.imdbID,
          title: movie.Title,
        })
      "
    >
      <slot name="like" />
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>
    <v-btn v-else @click="unLike(movie.imdbID)">
      <slot name="liked" />
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'FavoriteButton',
  props: {
    movie: {
      type: Object,
      default: null,
    },
    isLiked: {
      type: Boolean,
      default: null,
    },
  },
  methods: {
    ...mapActions(['addToFavorite', 'removeFromFavorite']),
    like(id) {
      this.addToFavorite(id)
      this.$emit('isLiked', true)
    },
    unLike(id) {
      this.removeFromFavorite(id)
      this.$emit('isLiked', false)
    },
  },
}
</script>
