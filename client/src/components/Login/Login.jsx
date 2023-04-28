import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <h2>LOGIN</h2>
        <p></p>
        <button className={styles.btnLogin} onClick={change_to_login}>
          LOGIN
        </button>
      </div>
      <div className={styles.colsMdSignUp}>
        <div className={styles.contBaOpcitiy}>
          <h2>SIGN UP</h2>
          <p></p>
          <button className={styles.btnSignUp} onClick={change_to_sign_up}>
            SIGN UP
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
