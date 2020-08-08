<template>
  <span>
    <v-btn
      v-if="!isLiked"
      :small="small"
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
    <v-btn v-else :small="small" @click="unLike(imdbID)">
      <slot name="liked" />
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LikeButton',
  props: {
    imdbID: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    small: {
      type: Boolean,
      default: false,
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
      .collection(`users/${this.user.uid}/likes`)
      .doc(this.imdbID)
      .get()
      .then((doc) => {
        this.isLiked = doc.exists
      })
  },
  methods: {
    ...mapActions(['addToLikes', 'removeFromLikes']),
    like(id) {
      this.addToLikes(id)
      this.isLiked = true
    },
    unLike(id) {
      this.removeFromLikes(id)
      this.isLiked = false
    },
  },
}
</script>
