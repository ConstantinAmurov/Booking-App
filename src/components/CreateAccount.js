import React from "react";

import styles from "../css/register.module.css";
import googleLogo from "../img/google-icon.svg"
import facebookLogo from "../img/facebook-icon.svg"
import FormInput from "./FormInput"
const CreateAccount = () => {
  return (
    <div className={styles.signup}>

      <div >
        <h1>Create Account</h1>
        <button class={styles.btngoogle}><img className={styles.icon} src={googleLogo}></img>sign up with google</button>
        <button class={styles.btnfacebook}>  <img className={styles.icon} src={facebookLogo}></img>  sign up with facebook</button>
        <p class={styles.horizontalLine}><span>or</span></p>

      </div>
      <div className={styles.formdiv}>
        <form className={styles.form}>
          <FormInput labelText="First Name" type="text" name="first-name"></FormInput>

          <FormInput labelText="Last Name" type="text" name="last-name"></FormInput>
          <FormInput labelText="Email" type="email" name="email"></FormInput>
          <FormInput labelText="Password" type="email" name="password"></FormInput>
          <div className={styles.termsagree}>

            <FormInput labelText="" type="checkbox" name="termsagree"></FormInput>

            <p>I agree with term and services</p></div>
          <input class={styles.btnCreate} type="submit" value="Create account" />
        </form>
        <div className={styles.login}><p>Have an account ? </p> <a>Login</a></div>
      </div>
    </div>
  );
};

export default CreateAccount;
