import React from "react";
import CreateAccount from "./CreateAccount";
import styles from "../css/register.module.css";
import "../App.css";

const helloImg = require("../img/hotel-booking.svg").default;
const Register = () => {
  return (
    <div className={styles.main}>
      <div className={styles.greeting}>
        <h1>Let's Grow Your Business!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <img src={helloImg} alt="" srcset="" />
      </div>
      <CreateAccount></CreateAccount>
    </div>
  );
};

export default Register;
