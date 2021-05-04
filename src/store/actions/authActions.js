import firebase from "../../Firebase";
import { useHistory } from "react-router-dom";
import { addNewUser, addNewSocialUser } from "../../contexts/DatabaseContext";
export async function login(props) {
  const { email, password } = props;
  debugger;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      debugger;
      return userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

export async function register(props) {
  const { email, password } = props;
  debugger;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

export async function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log("An error happened.");
    });
}

export async function signUpWithSocialMedia(provider) {
  try {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((cred) => {
        addNewSocialUser(cred.user);
      });
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential_1 = error.credential;
  }
}
