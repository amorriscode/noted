<template>
  <div class="section">
    <div class="container">

      <div class="content-wrapper">

        <div class="box">
          <h3 class="title">Login</h3>

          <p class="control has-icon">
            <input v-model="credentials.email" class="input" type="email" placeholder="Email">
            <span class="icon is-small">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
          <p class="control has-icon">
            <input v-model="credentials.password" class="input" type="password" placeholder="Password">
            <span class="icon is-small">
              <i class="fa fa-lock"></i>
            </span>
          </p>
          <p class="control">
            <button @click="login" class="button is-success">
              Login
            </button>

          </p>

        </div><!-- /.box -->

        <a class="signup-link"><router-link to="/signup">Need to create an account?</router-link></a>

      </div><!-- /.content-wrapper -->

    </div><!-- /.container -->
  </div><!-- /.section -->
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
    created() {
      window.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          this.login();
        }
      });
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

        // Head to the notes page
        this.$router.push('notes');
      }
    }
  }
</script>

<style>
  .section {
    width: 100%;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signup-link {
    position: absolute;
    bottom: -5px;
    right: 0;
  }

  .box {
    width: 100%;
  }

  .content-wrapper {
    position: relative;
  }

  @media(min-width: 769px) {
    .content-wrapper {
      width: 35%;
    }
  }
</style>