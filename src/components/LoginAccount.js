import React from "react";
import styles from "../css/login.module.css";
import FormInput from "./FormInput";
const LoginAccount = () => {
    return (
        <div className={styles.login}>

            <div className={styles.formdiv}>
                <h1>Login</h1>
                <form className={styles.form}>
                    <FormInput labelText="Email" type="email" name="email"></FormInput>
                    <FormInput
                        labelText="Password"
                        type="email"
                        name="password"
                    ></FormInput>
                    <a>Forgot Password?</a>

                    <input
                        class={styles.btnLogin}
                        type="submit"
                        value="Login"
                    />
                </form>

                <div><span><p>Don't have an account?</p></span> <span><a>Register</a></span></div>

            </div>
        </div>
    );
};

export default LoginAccount;
