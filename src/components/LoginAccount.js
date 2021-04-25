import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/login.module.css";
import FormInput from "./FormInput";

import { useAuth } from "../contexts/AuthContext";
import { validateForm, validateLogin } from "../services/ValidateForm.service";
const LoginAccount = () => {
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

    try {
      if (validateForm(errors)) {
        setLoading(true);
        const newUser = {
          email,
          password,
        };

        await login(newUser);
        console.log(newUser);
        history.push("/");
      }
    } catch {
      alert("Not correct credentials");
    }
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
          <FormInput
            labelText="Password"
            type="password"
            name="password"
            onChange={onChange}
          ></FormInput>
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
