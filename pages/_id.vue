<template>
  <v-row v-if="user">
    <v-col cols="12">
      <v-banner single-line>
        {{ user.displayName }}
      </v-banner>
    </v-col>
    <v-col cols="12" sm="6">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Likes ( Total:
                {{ numLikes }}
                )
              </th>
              <th class="text-left table_header_imdb">
                IMDb
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="like in likes" :key="like.imdbID">
              <td>
                <nuxt-link
                  :to="{
                    name: 'details-id',
                    params: {
                      id: like.imdbID,
                    },
                  }"
                  class="text-decoration-none"
                >
                  {{ like.title }}
                </nuxt-link>
              </td>
              <td>
                <a
                  :href="'https://www.imdb.com/title/' + like.imdbID"
                  target="_blank"
                  rel="noopener"
                  class="text-decoration-none"
                >
                  <v-icon>
                    mdi-checkbox-multiple-blank-outline
                  </v-icon>
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col cols="12" sm="6">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Watchlist ( Total:
                {{ numWatchlist }}
                )
              </th>
              <th class="text-left table_header_imdb">
                IMDb
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="like in watchlist" :key="like.imdbID">
              <td>
                <nuxt-link
                  :to="{
                    name: 'details-id',
                    params: {
                      id: like.imdbID,
                    },
                  }"
                  class="text-decoration-none"
                >
                  {{ like.title }}
                </nuxt-link>
              </td>
              <td>
                <a
                  :href="'https://www.imdb.com/title/' + like.imdbID"
                  target="_blank"
                  rel="noopener"
                  class="text-decoration-none"
                >
                  <v-icon>
                    mdi-checkbox-multiple-blank-outline
                  </v-icon>
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    return {
      user: null,
      uid: null,
      likes: [],
      watchlist: [],
    }
  },
  computed: {
    numLikes() {
      return this.likes.length
    },
    numWatchlist() {
      return this.watchlist.length
    },
  },
  created() {
    this.$fireStore
      .collection('personal_pages')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.uid = doc.data().uid
      })
      .then(() => {
        this.$fireStore
          .collection('users')
          .doc(this.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.user = doc.data()
            } else {
              console.log('No such document!')
            }
          })
          .catch(function (error) {
            console.log('Error getting document:', error)
          })
      })
      .then(() => {
        this.$fireStore
          .collection(`users/${this.uid}/likes`)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.likes.push(doc.data())
            })
          })
          .catch((error) => {
            console.log('Error getting documents: ', error)
          })
      })
      .then(() => {
        this.$fireStore
          .collection(`users/${this.uid}/watch`)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.watchlist.push(doc.data())
            })
          })
          .catch((error) => {
            console.log('Error getting documents: ', error)
          })
      })
  },
}
</script>

<style lang="scss" scoped>
.table_header_imdb {
  width: 10%;

  @include vuetifySmall {
    width: auto;
  }
}
</style>
