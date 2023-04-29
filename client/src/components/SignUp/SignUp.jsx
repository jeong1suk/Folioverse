// 정원석

import React, { useState } from "react";
import axios from "axios";
import { useAxiosGet } from "../../CustomHooks";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  // 비밀번호 유효성검사, 숫자 문자 8글자 이상
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValid = validatePassword(e.target.value);
    if (isValid && e.target.value === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  // 비밀번호 재확인 용 함수
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
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
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/; // 최소 8자, 숫자와 문자 모두 포함
    return regex.test(password);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post(host + "/auth/signup", {
      name,
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
        <h1 className={styles.fvhead}>회원가입</h1>
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.inputTxt}
            type="text"
            placeholder="User"
            onChange={handleNameChange}
          />
          <label className={styles.label}>Username or email address</label>
          <input
            className={styles.inputTxt}
            type="email"
            onChange={handleEmailChange}
          />
          {!isEmailValid && (
            <div className={styles.text}>이메일 형식이 올바르지 않습니다.</div>
          )}
          <br />
          {isEmailValid && <label className={styles.label}>Password</label>}
          <input
            className={styles.inputPwd}
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          {!isPasswordValid && isEmailValid && (
            <div className={styles.text}>
              숫자, 문자, 특수문자 포함 8글자 이상 입력해주세요.
            </div>
          )}
          <br />
          <input
            className={styles.inputPwd}
            type="password"
            placeholder="Password check"
            onChange={handleConfirmPasswordChange}
          />
          {isFormValid &&
            (passwordMatch ? (
              <p className={styles.text}>Passwords match</p>
            ) : (
              <p className={styles.text}>Passwords do not match</p>
            ))}
          <br />
          <button className={styles.btn} type="submit" onClick={handleSubmit}>
            회원가입
          </button>
        </form>
      </div>

      <div className={styles.container}>
        <p className={styles.fvhead}>Welcome to Folioverse</p>
        <p className={styles.fvhead}>Let's begin the adventure</p>
      </div>
    </>
  );
}

export default SignUp;
