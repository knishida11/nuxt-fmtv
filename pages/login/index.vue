<template>
  <div class="loginButtons">
    <p>You're able to have your own likes and watchlist pages by logging in.</p>
    <v-btn @click="login">
      Login with Google
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Login',
  middleware: 'login',
  methods: {
    login() {
      const googleAuthProvider = new this.$fireAuthObj.GoogleAuthProvider()
      this.$fireAuth.signInWithRedirect(googleAuthProvider)
    },
  },
}
</script>

<style lang="scss" scoped>
.loginButtons {
  text-align: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
</style>
