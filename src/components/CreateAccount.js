import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/register.module.css";
import googleLogo from "../img/google-icon.svg";
import facebookLogo from "../img/facebook-icon.svg";
import FormInput from "./FormInput";
import { useAuth } from "../contexts/AuthContext";
import {
  validateForm,
  validateRegister,
} from "../services/ValidateForm.service";
const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  });
  const initialErrorsState = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  };
  const [checkbox, setCheckbox] = useState();
  const { signup } = useAuth();
  const { signUpWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onCheck = (e) => {
    setCheckbox(e.target.checked);
  };

  async function onSubmit(e) {
    e.preventDefault();
    validateRegister(errors, formData);

    setErrors({ ...errors, errors });

    try {
      if (validateForm(errors) && checkbox) {
        debugger;
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
      }
    } catch {
      alert("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className={styles.signup}>
      <div>
        <h1>Create Account</h1>
        <button class={styles.btngoogle} onClick={() => signUpWithGoogle()}>
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
        <form className={styles.form} onSubmit={(e) => onSubmit(e)} noValidate>
          <FormInput
            labelText="First Name"
            type="text"
            name="firstName"
            onChange={onChange}
          ></FormInput>
          <div className={styles.error}>{errors.firstNameError}</div>
          <FormInput
            labelText="Last Name"
            type="text"
            name="lastName"
            onChange={onChange}
          ></FormInput>
          <div className={styles.error}>{errors.lastNameError}</div>
          <FormInput
            labelText="Email"
            type="email"
            name="email"
            onChange={onChange}
          ></FormInput>
          <div className={styles.error}>{errors.emailError}</div>
          <FormInput
            labelText="Password"
            type="password"
            name="password"
            onChange={onChange}
          ></FormInput>
          <div className={styles.error}>{errors.passwordError}</div>
          <div className={styles.termsagree}>
            <FormInput
              labelText=""
              type="checkbox"
              name="termsagree"
              onChange={onCheck}
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
