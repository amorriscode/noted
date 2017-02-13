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
  import firebaseApp from '../firebaseApp';

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
        // Sign in with email and use some basic error handling
        firebaseApp.firebase.auth().signInWithEmailAndPassword(this.credentials.email, this.credentials.password).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });

        // Set the user in the store... (enhance this later)
        this.$store.commit('setUser', firebaseApp.firebase.auth().currentUser);
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