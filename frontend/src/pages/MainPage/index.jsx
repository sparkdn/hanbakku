import React, { useState } from "react";
import Map from "./Map";
import styles from "./index.module.css";
import DailyComponent from "./DailyComponent";
import TourComponent from "./TourComponent";
export default function Main() {
  const [activeType, setActiveType] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <form className={styles.inputContainer}>
          <input className={styles.input} type="text" placeholder="어쩌구" />
          <input className={styles.input} type="text" placeholder="저쩌구" />
        </form>
        <button className={styles.button}>적용하기</button>
      </div>

      <div className={styles.mapContainer}>
        <div className={styles.typeContainer}>
          <p
            className={`${styles.type} ${
              activeType === "일상" ? styles.active : ""
            }`}
            onClick={() => setActiveType("일상")}
          >
            일상
          </p>
          <p
            className={`${styles.type} ${
              activeType === "관광" ? styles.active : ""
            }`}
            onClick={() => setActiveType("관광")}
          >
            관광
          </p>
          {activeType === "관광" ? (
            <>
              <button
                className={`${styles.searchButton} ${
                  activeButton === "search" ? styles.activeButton : ""
                }`}
                onClick={() => setActiveButton("search")}
              >
                정류장으로 검색
              </button>
              <button
                className={`${styles.searchButton} ${
                  activeButton === "destination" ? styles.activeButton : ""
                }`}
                onClick={() => setActiveButton("destination")}
              >
                목적지로 검색
              </button>
            </>
          ) : (
            ""
          )}
        </div>

        {activeType === "일상" ? <DailyComponent /> : <TourComponent />}
      </div>
    </div>
  );
}
