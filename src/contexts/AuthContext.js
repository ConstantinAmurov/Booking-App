import React, { useContext, useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from "react-router-dom";
import firebase, { facebookProvider, googleProvider, auth } from "../Firebase";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(props) {
    const { email, password } = props;
    return auth.createUserWithEmailAndPassword(email, password);
  }
  async function signUpWithSocialMedia(provider) {
    debugger;
    setLoading(true);
    try {
      const result_1 = await firebase.auth().signInWithPopup(provider);
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result_1.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result_1.user;
      // ...
      setLoading(false);
      history.push("/");
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

  function login(props) {
    const { email, password } = props;
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signup,
    login,
    logout,
    resetPassword,
    currentUser,
    signUpWithSocialMedia,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
