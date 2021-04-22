import React, { useContext, useState } from "react";
import { auth } from "../Firebase/auth";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export function useAuth() {
  return useContext(AuthContext);
}
export default AuthProvider;
