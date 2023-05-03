// 정원석

import React, { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errMessage, setErrMessage] = useState("");

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
    return email.toLowerCase().match(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&].{6,18}$/;
    return regex.test(password);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(host + "/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", result.data.token);

      location.href = "/";
    } catch (err) {
      // console.log(err.response.data.message);
      setErrMessage(err.response.data.message);
    }
  };

  const isSumbitDisabled = !(isEmailValid && isPasswordValid && passwordMatch);
  return (
    <div className={`bg-white dark:bg-[#212121]`}>
      <div className={styles.container}>
        <h1 className={styles.fvhead}>폴리오버스로 여행 시작하기</h1>
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <label className={styles.label}>이름:</label>
          <input
            className={styles.inputTxt}
            type="text"
            placeholder="이름"
            onChange={handleNameChange}
          />
          <label className={styles.label}>이메일:</label>
          <input
            className={styles.inputTxt}
            type="email"
            placeholder="이메일"
            onChange={handleEmailChange}
          />
          {!isEmailValid && (
            <div className={styles.text}>이메일 형식이 올바르지 않습니다.</div>
          )}

          <label className={styles.label}>비밀번호:</label>
          <input
            className={styles.inputPwd}
            type="password"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
          />
          {!isPasswordValid && (
            <div className={styles.text}>
              숫자, 문자, 특수문자 포함 6글자 이상 입력해주세요.
            </div>
          )}

          <label className={styles.label}>비밀번호 확인:</label>
          <input
            className={styles.inputPwd}
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleConfirmPasswordChange}
          />
          {passwordMatch ? (
            <p className={styles.text}></p>
          ) : (
            <p className={styles.text}>비밀번호가 맞지 않습니다.</p>
          )}

          {errMessage && <div className={styles.inputErr}>{errMessage}</div>}
          <button
            className={styles.btn}
            type="submit"
            onClick={handleSubmit}
            disabled={isSumbitDisabled}
          >
            회원가입
          </button>
        </form>
      </div>

      <div className={styles.container}>
        <p className={styles.fvhead}>Welcome to Folioverse</p>
        <p className={styles.fvhead}>Let's begin the adventure</p>
      </div>
    </div>
  );
}

export default SignUp;
