import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKSuYgatIuVzSn8tRPeJ8gaGcDErY9bU8",
  authDomain: "booking-app-3d5da.firebaseapp.com",
  projectId: "booking-app-3d5da",
  storageBucket: "booking-app-3d5da.appspot.com",
  messagingSenderId: "442864928703",
  appId: "1:442864928703:web:874618d3e22168961d430a",
  measurementId: "G-5H6XLCSPSM",
};
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = firebase.firestore();
export default app;
