import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/login.module.css";
import FormInput from "./FormInput";
import { useAuth } from "../contexts/AuthContext";
const LoginAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password, firstName, lastName } = formData;
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    //need to implement validation;
    try {
      setError("");
      setLoading(true);
      const newUser = {
        email,
        password,
      };
      debugger;
      await login(newUser);
      console.log(newUser);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
  }

  return (
    <div className={styles.login}>
      {error & alert(error)}
      <div className={styles.formdiv}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
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
