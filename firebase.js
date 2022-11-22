import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB0h0CT-O6ndcFT4le5iNHTEodH_bhYwvQ",
  authDomain: "amson-2.firebaseapp.com",
  projectId: "amson-2",
  storageBucket: "amson-2.appspot.com",
  messagingSenderId: "630763857584",
  appId: "1:630763857584:web:d7e5e6baf1776609edbd75",
};

// Initialize Firebase
const app = !firebase.apps.lenght
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
