import React from "react";
import registerForm from "./registerForm"
import styles from "../css/register.module.css";
import googleLogo from "../img/google-icon.svg"
import facebookLogo from "../img/facebook-icon.svg"
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
          <label class={styles.label} for="first-name" >  First Name</label>

          <input class={styles.input} type="text" name="first-name" />

          <label class={styles.label}> Last name</label>
          <input class={styles.input} type="text" name="last-name" />
          <label class={styles.label}> Email</label>


          <input class={styles.input} type="email" name="email" />

          <label class={styles.label}>Password </label>
          <input class={styles.input} type="password" name="password" />

          <div className={styles.termsagree}><input class={styles.checkbox} type="checkbox" name="terms-agree" />
            <p>I agree with term and services</p></div>
          <input class={styles.btnCreate} type="submit" value="Create account" />
        </form>
        <div className={styles.login}><p>Have an account ? </p> <a>Login</a></div>
      </div>
    </div>
  );
};

export default CreateAccount;
