<template>
  <div class="section">
    <div class="container">

      <div class="content-wrapper">

        <div class="box">
          <h3 class="title">Signup</h3>

          <p class="control has-icon">
            <input v-model="credentials.email" class="input" type="email" placeholder="Email">
            <span class="icon is-small">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
          <p class="control has-icon">
            <input @keyup.enter="signup" v-model="credentials.password" class="input" type="password" placeholder="Password">
            <span class="icon is-small">
              <i class="fa fa-lock"></i>
            </span>
          </p>
          <p class="control">
            <button @click="signup" class="button is-success">
              Signup
            </button>

          </p>

        </div><!-- /.box -->

        <a class="login-link"><router-link to="/login">Already have an account?</router-link></a>

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
      firebaseApp.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // Set the user in the store... (enhance this later)
          this.$store.commit('setUser', firebaseApp.firebase.auth().currentUser);

          // Head to the notes page
          this.$router.push('notes');
        }
      });
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

  .login-link {
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
