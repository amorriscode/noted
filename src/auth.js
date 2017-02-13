import firebaseApp from './firebaseApp';

export default {

  constructor() {
    // Firebase auth listener
    firebaseApp.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.userAuthenticated(user);
      } else {
        // User is signed out.
      }
    });
  },

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(credentials) {
    // Signup with email and use some basic error handling
    firebaseApp.firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      // if (errorCode === 'auth/wrong-password') {
      //   alert('Wrong password.');
      // } else {
      //   alert(errorMessage);
      // }
      console.log(error);
    });
  },

  userAuthenticated(user) {
    // USER PROPERTIES
    // const displayName = user.displayName;
    // const email = user.email;
    // const emailVerified = user.emailVerified;
    // const photoURL = user.photoURL;
    // const isAnonymous = user.isAnonymous;
    // const uid = user.uid;
    // const providerData = user.providerData;

    localStorage.setItem('noted_uid', user.uid);
    this.user.authenticated = true
  },

  signup(user) {
    firebaseApp.firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
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
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('noted_uid')
    this.user.authenticated = false
  },

  checkAuth() {
    const noted_user = localStorage.getItem('noted_uid')
    if (noted_user) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

}
