// 정원석

import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const validatePassword = (password) => {
    const regex =
      /^(?=.[a-zA-Z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{6,18}$/; // 최소 8자, 숫자와 문자 특수문자 모두 포함
    return regex.test(password);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post(host + "/auth/login-process", {
      email,
      password,
    });

    localStorage.setItem("token", result.data.token);
    location.href = "/";

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.fvhead}>Sign in to Folioverse</p>
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <label className={styles.label}>Username or email address</label>
          <input
            className={styles.inputTxt}
            type="email"
            onChange={handleEmailChange}
          />
          <div>
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
      </div>
    </>
  );
}

export default Login;
