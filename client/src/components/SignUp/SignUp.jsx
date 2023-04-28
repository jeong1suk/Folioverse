import React, { useState } from "react";
import { useAxiosGet } from "../../CustomHooks";
import styles from "./SignUp.module.css";
const host = import.meta.env.VITE_SERVER_HOST;

function SignUp() {
  // const { data, error, loading } = useAxiosGet(`${host}/dummy/sign-up`);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
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

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 로직 구현
  };

  return (
    <div>
      <form className={styles.root}>
        <h1 className={styles.container}>FolioVerse</h1>
        <div className={styles.container}>
          <p className={styles.p}>Welcome to Folioverse</p>
          <p className={styles.p}>Let's begin the adventure</p>
        </div>

        <div className={styles.container}>
          <input type="text" placeholder="User" onChange={handleNameChange} />
          <p className={styles.p}>Enter your email*</p>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          {!isEmailValid && (
            <form className={styles.text}>
              이메일 형식이 올바르지 않습니다.
            </form>
          )}
          <br />
          {isEmailValid && (
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          )}
          {!isPasswordValid && isEmailValid && (
            <form className={styles.text}>
              비밀번호를 4글자 이상 넣어주세요.
            </form>
          )}
          <br />
          {isFormValid && (
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              onChange={handleConfirmPasswordChange}
            />
          )}
          {isFormValid &&
            (passwordMatch ? (
              <p className={styles.text}>Passwords match</p>
            ) : (
              <p className={styles.text}>Passwords do not match</p>
            ))}
          <br />
          {isFormValid && passwordMatch && (
            <button className={styles.button}>Sign Up</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
