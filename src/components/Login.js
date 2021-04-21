import React from "react";
import styles from "../css/register.module.css";
import "../App.css";
import LoginAccount from "./LoginAccount";
const helloImg = require("../img/welcome.svg").default;
const Login = () => {
  return (
    <div className={styles.main}>
      <div className={styles.greeting}>
        <h1>Hello Welcome Back!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <img src={helloImg} alt="" srcset="" />
      </div>
      <LoginAccount></LoginAccount>
    </div>
  );
};

export default Login;
