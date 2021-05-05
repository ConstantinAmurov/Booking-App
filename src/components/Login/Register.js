import React from "react";
import RegisterForm from "./RegisterForm";
import styles from "../../css/register.module.css";
import "../../css/App.css";

const helloImg = require("../../img/hotel-booking.svg").default;
const Register = () => {
  return (
    <div className={styles.main}>
      <div className={styles.greeting}>
        <h1>Let's Grow Your Business!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        <img src={helloImg} alt="" srcset="" />
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
