import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
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
      console.log(user);
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
