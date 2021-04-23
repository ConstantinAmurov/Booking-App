import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import styles from "../css/forgotpassword.module.css";
import { useAuth } from "../contexts/AuthContext";
const forgotPassImg = require("../img/forgot-password.svg").default;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      console.log(email);
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    //need to implement validation;
    setLoading(false);
    //signup(newUser);
  }

  return (
    <div className={styles.forgotPass}>
      {error & alert(error)}
      <img src={forgotPassImg} alt="" srcset="" />
      <h1>Reset password</h1>
      <div className={styles.formdiv}>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <FormInput
            labelText="Email"
            type="email"
            name="email"
            onChange={onChange}
          ></FormInput>
          <input class={styles.btnReset} type="submit" value="Reset Password" />
        </form>
        <div className={styles.reset}>
          <p>Go back to</p> <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
