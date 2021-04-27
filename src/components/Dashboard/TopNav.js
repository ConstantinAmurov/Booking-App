import React from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
const TopNav = () => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const userName = currentUser.displayName;
  const photoURL = currentUser.photoURL;

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("error in logging out");
    }
  }

  return (
    <div className={styles.topNav}>
      <div>
        <div>
          <img src={photoURL} className={styles.userImg}></img>
        </div>
        <div className={styles.userInfo}>
          <p>{currentUser.displayName}</p>
          <p className={styles.role}>Admin</p>
        </div>
        <div>
          <button className={styles.btnLogOut} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
