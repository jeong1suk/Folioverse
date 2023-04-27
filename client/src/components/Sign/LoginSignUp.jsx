import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
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
        <button className={styles.btn_login} onClick={change_to_login}>
          LOGIN
        </button>
      </div>
      <div className={styles.cols_md_sign_up}>
        <div className={styles.cont_ba_opcitiy}>
          <h2>SIGN UP</h2>
          <p></p>
          <button className={styles.btn_sign_up} onClick={change_to_sign_up}>
            SIGN UP
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
