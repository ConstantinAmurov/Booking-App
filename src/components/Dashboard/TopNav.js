import React, { useEffect } from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { useFirebase } from "react-redux-firebase";
import { LOGOUT } from "../../store/actions//actionTypes";

const TopNav = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  //get companies and services from database
  useEffect(async () => {}, []);
  const user = useSelector((state) => state.firebase.auth);
  const history = useHistory();

  const userName = user.displayName;
  const photoURL = user.photoURL;

  function handleSignOut() {
    firebase.logout();
    history.push("/");
  }

  return (
    <div className={styles.topNav}>
      <div>
        <div>
          <img src={photoURL} className={styles.userImg}></img>
        </div>
        <div className={styles.userInfo}>
          <p>{userName}</p>
          <p className={styles.role}>Admin</p>
        </div>
        <div>
          <button className={styles.btnLogOut} onClick={handleSignOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
