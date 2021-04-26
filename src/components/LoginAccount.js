import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/login.module.css";
import FormInput from "./FormInput";

import { useAuth } from "../contexts/AuthContext";
import { validateForm, validateLogin } from "../services/ValidateForm.service";
import { FiEye, FiEyeOff } from "react-icons/fi";
const LoginAccount = () => {
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

  const { email, password } = formData;
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
        const newUser = {
          email,
          password,
        };

        await login(newUser);
        history.push("/");
      }
    } catch {
      alert("Not correct credentials");
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
        </form>

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
