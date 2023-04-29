//정원석

import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
// 비밀번호 재설정할때 handlesubmit 함수 구현해야 함.
function ResetPassword() {
  const [password, setPassword] = useState("");

  return (
    <>
      <div className={styles.container}>
        <div>
          <label htmlFor="password" className={styles.label}>
            reset Password:
          </label>
        </div>
        <input className={styles.inputPwd} type="password" />
        <div>
          <label htmlFor="password" className={styles.label}>
            reset Password check:
          </label>
        </div>
        <input className={styles.inputPwd} type="password" />

        <button className={styles.btn} type="submit">
          비밀번호 재설정
        </button>
      </div>
    </>
  );
}

export default ResetPassword;
