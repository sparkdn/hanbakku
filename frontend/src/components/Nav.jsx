import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import styles from "./nav.module.css";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={logo} alt="로고" className={styles.logo} />

      <div className={styles.typeContainer}>
        <p className={styles.type} onClick={() => navigate("/")}>
          대시보드
        </p>
        <p className={styles.type} onClick={() => navigate("/map")}>
          지도 검색
        </p>
        <p className={styles.type} onClick={() => navigate("/articles")}>
          관련 기사
        </p>
      </div>
    </div>
  );
}
