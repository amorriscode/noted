import Firebase from 'firebase';

// Setup Firebase
const config = {
  apiKey: "AIzaSyDyx_n4m0U56fdlc-Jhsn7fOWzONP9O5Ak",
  authDomain: "noted-b5ad0.firebaseapp.com",
  databaseURL: "https://noted-b5ad0.firebaseio.com",
  messagingSenderId: "398915689559"
};

const firebase = Firebase.initializeApp(config);
const db = firebase.database();

module.exports = {
  firebase,
  db
}