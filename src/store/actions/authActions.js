import firebase from "../../Firebase";
import { useFirebase } from "react-redux-firebase";
import { addNewUser, addNewSocialUser } from "../../contexts/DatabaseContext";
export async function login(props) {
  const { email, password } = props;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in

      return userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

export const createNewUser = async ({ email, password, username }) => {
  return await firebase.createUser({ email, password }, { username, email });
};

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
  await firebase.login({
    provider: provider,
    type: "popup",
  });
}
