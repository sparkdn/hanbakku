import React from "react";
import logo from "../assets/images/logo.png";
import styles from "./nav.module.css";
export default function Nav() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="로고" className={styles.logo} />
      <div className={styles.typeContainer}>
        <p className={styles.type}>대시보드</p>
        <p className={styles.type}>지도 검색</p>
        <p className={styles.type}>관련 기사</p>
      </div>
    </div>
  );
}
