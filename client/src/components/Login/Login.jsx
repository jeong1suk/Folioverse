import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
const host = import.meta.env.VITE_SERVER_HOST;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post(host + "/auth/login-process", {
      email,
      password,
    });

    localStorage.setItem("token", result.data.token);
    navigate("/");

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.fvhead}>FolioVerse</h1>
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <label className={styles.label}>Username or email address</label>
          <input
            className={styles.inputTxt}
            type="email"
            onChange={handleEmailChange}
          />
          <div className={styles.inlineBlock}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
          </div>
          <input
            className={styles.inputPwd}
            type="password"
            onChange={handlePasswordChange}
          />

          <button className={styles.btn} type="submit" onClick={handleSubmit}>
            로그인
          </button>
        </form>

        <div className={styles.alternativeLogin}>
          <p className={styles.alternativeLoginP}>또는</p>
          <button className={styles.btn}>구글 로그인</button>
        </div>
        <p>
          <a href="/resetPwd" className={styles.link}>
            <button className={styles.btn}>비밀번호 재설정</button>
          </a>
        </p>
      </div>
      <div className={styles.container}>
        <p className={styles.fvhead}>Welcome to Folioverse</p>
        <p className={styles.fvhead}>Let's begin the adventure</p>
      </div>
    </>
  );
}

export default Login;
