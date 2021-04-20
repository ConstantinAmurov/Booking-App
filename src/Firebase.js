import firebase from "firebase/app";
import "firebase/firestore";

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
firebase.initializeApp(firebaseConfig);

export default firebase;
