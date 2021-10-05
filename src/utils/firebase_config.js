// imports
import * as firebase from "firebase/app";
import "firebase/firestore";

// configurations
var config = {
  apiKey: "AIzaSyCTK2treXtiYKRmY3V4gd6mP1v0lwZME8I",
  authDomain: "fir-authentication-proj-84b51.firebaseapp.com",
  projectId: "fir-authentication-proj-84b51",
  storageBucket: "fir-authentication-proj-84b51.appspot.com",
  messagingSenderId: "574983019139",
  appId: "1:574983019139:web:909bad7808b940a7cb19b6",
  measurementId: "G-9ZFB0JCY30",
};

// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore();

export { db };
