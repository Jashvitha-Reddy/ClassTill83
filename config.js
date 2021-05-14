import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyC9Jj1tWHSohdHrIOjftMrOGqJkhNBKPBg",
    authDomain: "santaapp-a6b0f.firebaseapp.com",
    projectId: "santaapp-a6b0f",
    storageBucket: "santaapp-a6b0f.appspot.com",
    messagingSenderId: "612438606342",
    appId: "1:612438606342:web:705e46a5fa75cfb79ff987"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore();

