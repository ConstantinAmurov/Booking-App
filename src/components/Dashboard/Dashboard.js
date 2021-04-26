import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import LeftMenu from "./Menu";
import TopNav from "./TopNav";

export default function Dashboard() {
  debugger;
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
      <LeftMenu selected="dashboard"></LeftMenu>
      <TopNav></TopNav>
      <strong>Email: </strong> {currentUser.email}
      <Link to="/update-profile">Update profile</Link>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
