import React, { useState } from "react";
import styles from "./index.module.css";
import DailyComponent from "./DailyComponent";
import TourComponent from "./TourComponent";
export default function Main() {
  const [activeType, setActiveType] = useState("일상");
  const [activeButton, setActiveButton] = useState("busStop");
  
  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <form className={styles.inputContainer}>
          <p className={styles.form_placeorder}>항목별 지중을 선택해주세요(0~20).</p>
          <label for="hotel" >관광호텔업</label>
          <div className={styles.range_input}>0 <input className={styles.input} type="range" name="hotel" min="0" max="20"/> 20</div>
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
          {activeType === "관광" && (
            <>
              <button
                className={`${styles.searchButton} ${
                  activeButton === "busStop" ? styles.activeButton : ""
                }`}
                onClick={() => setActiveButton("busStop")}
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
          )}
        </div>

        {activeType === "일상" ? (
          <DailyComponent />
        ) : (
          <TourComponent activeButton={activeButton} />
        )}
      </div>
    </div>
  );
}
