<template>
  <div class="loginButtons">
    <p>You're able to have your own likes and watchlist pages by logging in.</p>
    <v-btn color="primary" @click="googleLogin">
      <v-icon class="mr-1">
        mdi-google
      </v-icon>
      Login with Google
    </v-btn>
    <v-form ref="form" v-model="valid" @submit.prevent="emailLogin">
      <v-container class="py-0">
        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-divider class="my-5" />
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model="password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordShow ? 'text' : 'password'"
              class="pt-0 mt-0"
              label="Password"
              required
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              @click:append="passwordShow = !passwordShow"
            />
          </v-col>
          <v-col v-if="error" cols="12" sm="4" offset-sm="4">
            <p class="red lighten-1 px-2 py-2 white--text">
              {{ error }}
            </p>
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-btn color="primary" type="submit" @click="submit">
              <v-icon class="mr-1">
                mdi-email-outline
              </v-icon>
              Login with email
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <nuxt-link to="/create">
              Create Account
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  data() {
    return {
      error: null,
      valid: false,
      email: '',
      password: '',
      passwordShow: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength &&
        errors.push('Passwords must be at least 6 characters long')
      return errors
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push('/')
      }
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
    },
    googleLogin() {
      const googleAuthProvider = new this.$fireAuthObj.GoogleAuthProvider()
      this.$fireAuth.signInWithRedirect(googleAuthProvider)
    },
    emailLogin() {
      this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = error
        })
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
