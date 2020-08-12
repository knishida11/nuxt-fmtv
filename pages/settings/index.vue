<template>
  <div v-if="user" class="settings">
    <div class="text-center">
      <p class="mb-0">
        Your email :
        {{ user.email }}
      </p>
    </div>
    <v-row>
      <v-col cols="12" sm="4" offset-sm="4">
        <v-divider class="my-2" />
        <v-form
          v-model="newDisplayNameValid"
          class="text-center"
          @submit.prevent="changeDisplayName"
        >
          <v-container>
            <v-text-field
              v-model.trim="newDisplayName"
              label="New Display Name"
              required
              :rules="newDisplayNameRules"
            />
            <v-btn type="submit" :disabled="!newDisplayNameValid">
              Change Display Name
            </v-btn>
          </v-container>
        </v-form>
      </v-col>
      <v-col v-if="showChangePassword" cols="12" sm="4" offset-sm="4">
        <v-divider class="my-2" />
        <v-form
          v-model="newPasswordValid"
          class="text-center"
          @submit.prevent="changePassword"
        >
          <v-container>
            <v-text-field
              v-model.trim="newPassword"
              label="New Password"
              required
              :rules="passwordRules"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordShow ? 'text' : 'password'"
              @click:append="passwordShow = !passwordShow"
            />
            <p
              v-if="changePasswordSuccess"
              class="green lighten-1 px-2 py-2 white--text"
            >
              {{ changePasswordSuccessMessage }}
            </p>
            <p
              v-if="changePasswordFail"
              class="red lighten-1 px-2 py-2 white--text"
            >
              {{ changePasswordFailMessage }}
            </p>
            <v-btn type="submit" :disabled="!newPasswordValid">
              Change Password
            </v-btn>
          </v-container>
        </v-form>
      </v-col>
      <v-col v-if="showChangePassword" cols="12" sm="4" offset-sm="4">
        <v-divider class="my-2" />
        <v-form class="text-center" @submit.prevent="deleteUser">
          <v-container>
            <v-btn type="submit" small color="error">
              delete Accout
            </v-btn>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
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
      showChangePassword: false,
      newPassword: '',
      newPasswordValid: false,
      passwordShow: false,
      passwordRules: [(v) => v.length >= 6 || 'At least 6 characters'],
      changePasswordSuccess: false,
      changePasswordSuccessMessage: '',
      changePasswordFail: false,
      changePasswordFailMessage: '',
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  created() {
    const providerId = this.$fireAuth.currentUser.providerData[0].providerId
    if (providerId === 'password') this.showChangePassword = true
  },
  methods: {
    changeDisplayName() {
      this.$fireStore.collection('users').doc(this.user.uid).update({
        displayName: this.newDisplayName,
      })
      this.$store.dispatch('user/changeStateDisplayName', this.newDisplayName)
      this.newDisplayName = ''
    },
    changePassword() {
      const user = this.$fireAuth.currentUser

      user
        .updatePassword(this.newPassword)
        .then(() => {
          this.changePasswordSuccess = true
          this.changePasswordSuccessMessage =
            'Your password has been changed successfully!'
        })
        .catch((error) => {
          this.changePasswordFail = true
          this.changePasswordFailMessage = error
        })
    },
    deleteUser() {
      const user = this.$fireAuth.currentUser

      user
        .delete()
        .then(() => {
          this.$fireStore.collection('users').doc(this.user.uid).delete()
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.settings {
  text-align: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
</style>
