import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("error in logging out");
    }
  }

  return (
    <>
      <strong>Email: </strong> {currentUser.email}
      <Link to="/update-profile">Update profile</Link>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
