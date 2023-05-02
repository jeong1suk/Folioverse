// 정원석

import axios from "axios";
import React, { useState } from "react";
import styles from "./Login.module.css";
const host = import.meta.env.VITE_SERVER_HOST;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    return email.toLowerCase().match(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&].{6,18}$/;
    return regex.test(password);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(host + "/auth/login-process", {
        email,
        password,
      });

      localStorage.setItem("token", result.data.token);
      location.href = "/";
    } catch (err) {
      setErrMessage(err.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.containerHead}>
        <img
          className={styles.logo}
          src="/logo/logo-light.png"
          alt="로고 이미지"
        />
        <p className={styles.fvhead}>폴리오버스로 출발하기</p>
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <label className={styles.label}>이메일</label>
          <input
            className={styles.inputTxt}
            type="email"
            placeholder="이메일"
            onChange={handleEmailChange}
          />
          <div>
            <label htmlFor="password" className={styles.label}>
              비밀번호:
            </label>
          </div>
          <input
            className={styles.inputPwd}
            type="password"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
          />
          <br />
          {errMessage && <div className={styles.inputErr}>{errMessage}</div>}

          <button
            className={`${styles.btn} ${
              isEmailValid && isPasswordValid
                ? styles.btnActive
                : styles.btnDisabled
            }`}
            type="submit"
            disabled={!isEmailValid || !isPasswordValid}
            onClick={handleSubmit}
          >
            로그인
          </button>
        </form>

        <div className={styles.alternativeLogin}>
          <p className={styles.alternativeLoginP}>또는</p>
          <button className={styles.btnGoogle}>
            <img
              className={styles.logo1}
              src="/logo/logo-light.png"
              alt="로고 이미지"
            />
            구글로 로그인
          </button>
          <button className={styles.btnKakao}>
            <img
              className={styles.logo1}
              src="/logo/logo-light.png"
              alt="로고 이미지"
            />
            카카오 로그인
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
