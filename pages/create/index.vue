<template>
  <div class="loginButtons">
    <v-form ref="form" v-model="valid" @submit.prevent="createAccount">
      <v-container class="py-0">
        <v-row>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model.trim="displayName"
              class="pt-0 mt-0"
              :rules="displayNameRules"
              label="Display Name"
              required
              @keyup="resetError"
            />
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model="email"
              class="pt-0 mt-0"
              :rules="emailRules"
              label="E-mail"
              required
              @keyup="resetError"
            />
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model="password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordShow ? 'text' : 'password'"
              class="pt-0 mt-0"
              :rules="passwordRules"
              label="Password"
              required
              @keyup="resetError"
              @click:append="passwordShow = !passwordShow"
            />
          </v-col>
          <v-col v-if="error" cols="12" sm="4" offset-sm="4">
            <p class="red lighten-1 px-2 py-2 white--text">
              {{ error }}
            </p>
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-btn color="primary" type="submit" :disabled="!valid">
              <v-icon class="mr-1">
                mdi-account-plus-outline
              </v-icon>
              Create Account
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <nuxt-link to="/login">
              Back to login
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Create',
  data() {
    return {
      error: null,
      valid: false,
      email: '',
      password: '',
      displayName: '',
      passwordShow: false,
      displayNameRules: [(v) => !!v || 'Display Name is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(
            v
          ) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'At least 6 characters',
      ],
    }
  },

  computed: {
    ...mapGetters('user', ['user']),
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push('/')
      }
    },
  },
  methods: {
    resetError() {
      this.error = null
    },
    createAccount() {
      this.$fireAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: this.displayName,
          })
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = error
        })
    },
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>

<style lang="scss" scoped>
.loginButtons {
  text-align: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
</style>
