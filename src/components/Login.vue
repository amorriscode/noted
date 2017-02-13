<template>
  <div>
    <input v-model="credentials.email" placeholder="Email">
    <input v-model="credentials.password" placeholder="Password">
    <button @click="login">Login</button>

    OR

    <input v-model="credentials.email" placeholder="Email">
    <input v-model="credentials.password" placeholder="Password">
    <button @click="signup">Signup</button>
  </div>
</template>

<script>
  import auth from '../auth';

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        const credentials = this.credentials;
        auth.login(credentials);
      },
      signup() {
        const credentials = this.credentials;
        auth.signup(credentials);
      }
    }
  }
</script>

<style>
</style>