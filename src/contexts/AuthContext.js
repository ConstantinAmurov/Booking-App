import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  debugger;
  const [currentUser, setCurrentUser] = useState();

  function signup(props) {
    const { email, password } = props;
    return auth.createUserWithEmailAndPassword(email, password);
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

      return unsubscribe;
    });
  }, []);

  const value = {
    signup,
    login,
    logout,
    resetPassword,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export function useAuth() {
  return useContext(AuthContext);
}
export default AuthProvider;
