import React from "react";
import styles from "../../css/Dashboard/Dashboard.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authActions";
const TopNav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(user);
  const userName = user.displayName;
  const photoURL = user.photoURL;
  //merge userul

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
          <button className={styles.btnLogOut} onClick={signOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
