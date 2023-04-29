import React from "react";
import styles from "./ResetPassword.module.css";
function ResetPassword() {
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
      </div>
    </>
  );
}

export default ResetPassword;
