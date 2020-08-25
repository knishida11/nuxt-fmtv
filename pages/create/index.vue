<template>
  <div class="loginButtons">
    <v-form ref="form" v-model="valid" @submit.prevent="createAccount">
      <v-container class="py-0">
        <v-row>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model.trim="displayName"
              class="pt-0 mt-0"
              label="Display Name"
              required
              :error-messages="displayNameErrors"
              @input="$v.displayName.$touch()"
              @blur="$v.displayName.$touch()"
            />
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model.trim="email"
              class="pt-0 mt-0"
              label="E-mail"
              required
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
          </v-col>
          <v-col cols="12" sm="4" offset-sm="4">
            <v-text-field
              v-model.trim="password"
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
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'Create',
  mixins: [validationMixin],
  validations: {
    displayName: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  data() {
    return {
      error: null,
      valid: false,
      email: '',
      password: '',
      displayName: '',
      passwordShow: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    displayNameErrors() {
      const errors = []
      if (!this.$v.displayName.$dirty) return errors
      !this.$v.displayName.required && errors.push('Display Name is required')
      return errors
    },
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
    async createAccount() {
      try {
        const userCredentials = await this.$fireAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        await userCredentials.user.updateProfile({
          displayName: this.displayName,
        })
        await this.$fireStore
          .collection('users')
          .doc(userCredentials.user.uid)
          .set({
            displayName: userCredentials.user.displayName,
            uid: userCredentials.user.uid,
            email: userCredentials.user.email,
            pageId: userCredentials.user.uid,
          })
        await this.$fireStore
          .collection('personal_pages')
          .doc(userCredentials.user.uid)
          .set({
            uid: userCredentials.user.uid,
          })
        this.$router.push('/')
      } catch (error) {
        alert(error)
      }
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
