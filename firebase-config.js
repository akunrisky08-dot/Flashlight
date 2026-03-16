// firebase-config.js

// GANTI DENGAN CONFIG FIREBASE LU SENDIRI!
const firebaseConfig = {
  apiKey: "AIzaSyCoC-uCqyiuE_jrJlVbRXrqlNsqiRrTLHU", // GANTI INI
  authDomain: "otrat-27a09.firebaseapp.com",
  databaseURL: "https://otrat-27a09-default-rtdb.firebaseio.com/", // GANTI
  projectId: "otrat-27a09",
  storageBucket: "otrat-27a09.firebasestorage.app",
  messagingSenderId: "414699965939",
  appId: "1:414699965939:web:a8eef41cfec2fbb1021686"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();