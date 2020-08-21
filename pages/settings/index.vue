<template>
  <div v-if="user" class="settings">
    <v-container>
      <v-row>
        <v-col cols="12" sm="5" offset-sm="1">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Display Name</td>
                  <td>{{ user.displayName }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <td>Personal Page ID</td>
                  <td>{{ user.pageId }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="12" sm="5">
          <v-form
            v-model="newDisplayNameValid"
            class="d-flex align-center mb-1"
            @submit.prevent="changeDisplayName"
          >
            <div class="input_box">
              <v-text-field
                v-model.trim="newDisplayName"
                label="New Display Name"
                required
                :rules="newDisplayNameRules"
              />
            </div>
            <div class="change_button_box text-center">
              <v-btn type="submit" small :disabled="!newDisplayNameValid">
                Change
              </v-btn>
            </div>
          </v-form>
          <v-form
            v-model="newPersonalPageIdValid"
            @submit.prevent="changePersonalPageId"
          >
            <div class="d-flex align-center">
              <div class="input_box">
                <v-text-field
                  v-model.trim="newPersonalPageId"
                  label="New Personal Page ID"
                  required
                  :rules="newPersonalPageIdNameRules"
                />
              </div>
              <div class="change_button_box text-center">
                <v-btn type="submit" small :disabled="!newPersonalPageIdValid">
                  Change
                </v-btn>
              </div>
            </div>
            <p
              v-if="newPersonalPageIdError"
              class="mt-2 red lighten-1 px-2 py-1 white--text"
            >
              {{ newPersonalPageIdError }}
            </p>
          </v-form>
        </v-col>
        <v-col cols="12" sm="8" offset-sm="2">
          <form class="text-center mt-8">
            <div class="mb-3">
              <input
                id="check"
                v-model="deleteCheckbox"
                name="check"
                type="checkbox"
              />
              <label for="check">
                Check it to activate the delete button if you want to delete
                your account.
              </label>
            </div>
            <v-btn
              color="error"
              small
              :disabled="!deleteCheckbox"
              @click="deleteUser"
            >
              Delete User
            </v-btn>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Settings',
  data() {
    return {
      newDisplayNameValid: false,
      newDisplayName: '',
      newDisplayNameRules: [(v) => !!v || 'New Display Name is required'],
      newPersonalPageIdValid: false,
      newPersonalPageId: '',
      newPersonalPageIdError: null,
      newPersonalPageIdNameRules: [
        (v) => !!v || 'New Display Name is required',
        (v) => /^[a-z0-9]+$/.test(v) || 'New Display Name is not valid',
      ],
      deleteCheckbox: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    changeDisplayName() {
      this.$fireStore.collection('users').doc(this.user.uid).update({
        displayName: this.newDisplayName,
      })
      this.$store.dispatch('user/changeStateDisplayName', this.newDisplayName)
    },
    changePersonalPageId() {
      this.$fireStore
        .collection('personal_pages')
        .doc(this.newPersonalPageId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.newPersonalPageId = ''
            this.newPersonalPageIdError = "It's not available. Try another one."
          } else {
            this.$fireStore
              .collection('personal_pages')
              .doc(this.user.pageId)
              .get()
              .then((doc) => {
                if (doc && doc.exists) {
                  const data = doc.data()
                  this.$fireStore
                    .collection('personal_pages')
                    .doc(this.newPersonalPageId)
                    .set(data)
                    .then(() => {
                      this.$fireStore
                        .collection('personal_pages')
                        .doc(this.user.pageId)
                        .delete()
                    })
                    .then(() => {
                      this.$fireStore
                        .collection('users')
                        .doc(this.user.uid)
                        .update({
                          pageId: this.newPersonalPageId,
                        })
                    })
                    .then(() => {
                      this.$store.dispatch(
                        'user/changeStatePersonalId',
                        this.newPersonalPageId
                      )
                    })
                }
              })
          }
        })
        .catch(function (error) {
          alert('Error getting document:', error)
        })
    },
    async deleteUser() {
      try {
        const user = await this.$fireAuth.currentUser
        await this.$fireStore.collection('users').doc(this.user.uid).delete()
        await this.$fireStore
          .collection('personal_pages')
          .doc(this.user.pageId)
          .delete()
        await user.delete()
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.settings {
  @include vuetifySmall {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}

.input_box {
  width: 70%;

  @include vuetifySmall {
    width: 75%;
  }

  button {
    width: 100%;
  }
}

.change_button_box {
  width: 30%;

  @include vuetifySmall {
    width: 25%;
  }

  button {
    width: 100%;
  }
}
</style>
