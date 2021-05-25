import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../css/register.module.css";
import googleLogo from "../../img/google-icon.svg";
import facebookLogo from "../../img/facebook-icon.svg";
import FormInput from "../FormInput";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { facebookProvider, googleProvider } from "../../Firebase";
import { useAuth } from "../../contexts/AuthContext";
import { app } from "../../Firebase";
import firebase from "../../Firebase";
import {
  createNewUser,
  signUpWithSocialMedia,
} from "../../store/actions/authActions";
import {
  validateForm,
  validateRegister,
} from "../../services/ValidateForm.service";
const CreateAccount = () => {
  const [visible, setVisible] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
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
  // const { signup } = useAuth();

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

    forceUpdate();

    try {
      if (validateForm(errors) && checkbox) {
        setLoading(true);
        const newUser = {
          firstName,
          lastName,
          email,
          password,
        };

        const createdUser = await createNewUser({
          email: email,
          password: password,
          username: firstName,
        });
        createdUser != null
          ? firebase.login({
              email: createdUser.email,
              password: password,
            })
          : console.log("Error at creating acount");

        history.push("/dashboard");
      }
    } catch {
      console.log("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className={styles.signup}>
      <div>
        <h1>Create Account</h1>
        <button
          class={styles.btngoogle}
          onClick={async () => {
            await signUpWithSocialMedia("google");
            history.push("/dashboard");
          }}
        >
          <img className={styles.icon} src={googleLogo}></img>sign up with
          google
        </button>
        <button
          class={styles.btnfacebook}
          onClick={async () => {
            await signUpWithSocialMedia("facebook");
            history.push("/dashboard");
          }}
        >
          {" "}
          <img className={styles.icon} src={facebookLogo}></img> sign up with
          facebook
        </button>
        <p class={styles.horizontalLine}>or</p>
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
          <div style={{ position: "relative" }}>
            <FormInput
              labelText="Password"
              type={visible ? "text" : "password"}
              name="password"
              onChange={onChange}
            ></FormInput>
            <span
              id={styles.passwordInput}
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>

          <div className={styles.error}>{errors.passwordError}</div>
          <div className={styles.termsagree}>
            <FormInput
              id="termsAgree"
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
