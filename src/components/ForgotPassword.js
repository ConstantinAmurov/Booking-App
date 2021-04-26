import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import FormInput from "./FormInput";
import styles from "../css/forgotpassword.module.css";
import { useAuth } from "../contexts/AuthContext";
import { validateReset } from "../services/ValidateForm.service";
const forgotPassImg = require("../img/forgot-password.svg").default;

const ForgotPassword = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  var [emailError, setEmailError] = useState("");
  const { resetPassword } = useAuth();
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setEmailError(validateReset(email));

    try {
      setMessage("");
      console.log(email);
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      console.log("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className={styles.forgotPass}>
      <img src={forgotPassImg} alt="" srcset="" />
      <h1>Reset password</h1>
      <div className={styles.formdiv}>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)} noValidate>
          <FormInput
            labelText="Email"
            type="email"
            name="email"
            onChange={onChange}
          ></FormInput>
          <div className={styles.error}>{emailError}</div>
          <input class={styles.btnReset} type="submit" value="Reset Password" />
        </form>
        <div> {message}</div>
        <div className={styles.reset}>
          <p>Go back to</p> <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
