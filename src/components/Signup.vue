<template>
  <div>
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
      signup() {
        firebaseApp.firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password).catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });

        // Set the user in the store... (enhance this later)
        this.$store.commit('setUser', firebaseApp.firebase.auth().currentUser)
      }
    }
  }
</script>

<style>
</style>
