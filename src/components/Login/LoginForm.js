import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../css/login.module.css";
import FormInput from "../FormInput";
import { facebookProvider, googleProvider } from "../../Firebase";
import { signUpWithSocialMedia } from "../../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { firebaseReducer, useFirebase } from "react-redux-firebase";
// import { useAuth } from "../../contexts/AuthContext";
import {
  validateForm,
  validateLogin,
} from "../../services/ValidateForm.service";
import { FiEye, FiEyeOff } from "react-icons/fi";
import googleLogo from "../../img/google-icon.svg";
import facebookLogo from "../../img/facebook-icon.svg";

import { SIGNIN } from "../../store/actions/actionTypes";
const LoginAccount = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const [logInError, setLogInError] = useState("");

  const { email, password } = formData;
  // const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    validateLogin(errors, formData);
    forceUpdate();

    try {
      if (validateForm(errors)) {
        setLoading(true);

        firebase.login({
          email: email,
          password: password,
        });

        history.push("/dashboard");
      }
    } catch {
      console.log("user not found");
    }
    setLoading(false);
  }

  return (
    <div className={styles.login}>
      <div className={styles.formdiv}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)} noValidate>
          <FormInput
            labelText="Email"
            type="email"
            name="email"
            onChange={onChange}
          ></FormInput>
          <div className={styles.error}>{errors.emailError}</div>
          <div>
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
          <Link to="/forgot-password">Forgot Password?</Link>
          <input class={styles.btnLogin} type="submit" value="Login" />
          <p className="errors">{logInError}</p>
        </form>
        <div className={styles.socialMedia}>
          <p>Login with social media</p>
          <img
            onClick={async () => {
              await signUpWithSocialMedia("google");

              history.push("/dashboard");
            }}
            className={styles.icon}
            src={googleLogo}
          ></img>
          <img
            onClick={() =>
              signUpWithSocialMedia("facebook").then(() =>
                history.push("/dashboard")
              )
            }
            className={styles.icon}
            src={facebookLogo}
          ></img>
        </div>
        <div>
          <span>
            <p>Don't have an account?</p>
          </span>{" "}
          <span>
            <Link to="/signup">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginAccount;
