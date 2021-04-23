import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/register.module.css";
import googleLogo from "../img/google-icon.svg";
import facebookLogo from "../img/facebook-icon.svg";
import FormInput from "./FormInput";
import { useAuth } from "../contexts/AuthContext";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = formData;
  const { signup } = useAuth();

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  debugger;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    //need to implement validation;
    try {
      setLoading(true);

      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      await signup(newUser);
      history.push("/");
      console.log(newUser);
    } catch {
      console.log("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className={styles.signup}>
      {/* {error & alert(error)} */}
      <div>
        <h1>Create Account</h1>
        <button class={styles.btngoogle}>
          <img className={styles.icon} src={googleLogo}></img>sign up with
          google
        </button>
        <button class={styles.btnfacebook}>
          {" "}
          <img className={styles.icon} src={facebookLogo}></img> sign up with
          facebook
        </button>
        <p class={styles.horizontalLine}>
          <span>or</span>
        </p>
      </div>
      <div className={styles.formdiv}>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <FormInput
            labelText="First Name"
            type="text"
            name="firstName"
            onChange={onChange}
          ></FormInput>

          <FormInput
            labelText="Last Name"
            type="text"
            name="lastName"
            onChange={onChange}
          ></FormInput>
          <FormInput
            labelText="Email"
            type="email"
            name="email"
            onChange={onChange}
          ></FormInput>
          <FormInput
            labelText="Password"
            type="password"
            name="password"
            onChange={onChange}
          ></FormInput>
          <div className={styles.termsagree}>
            <FormInput
              labelText=""
              type="checkbox"
              name="termsagree"
            ></FormInput>

            <p>I agree with term and services</p>
          </div>
          <input
            class={styles.btnCreate}
            type="submit"
            value="Create account"
          />
        </form>
        <div className={styles.login}>
          <p>Have an account ? </p> <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
