import React, { useState } from "react";
import styles from "./index.module.css";
import DailyComponent from "./DailyComponent";
import TourComponent from "./TourComponent";
export default function Main() {
  const [activeType, setActiveType] = useState("일상");
  const [activeButton, setActiveButton] = useState("busStop");

  // 상태: 입력된 시간을 저장
  const [time, setTime] = useState("00:00");
  const [calculatedTime, setCalculatedTime] = useState("01:00");

  // 시간 입력 핸들러
  const handleChange = (event) => {
    const value = event.target.value;
    const [hours, minutes] = value.split(":").map(Number);
    setTime(`${hours}:00`); // 분을 항상 00으로 설정

    // 현재 선택된 시간에 1시간을 더한 값 계산
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setHours(date.getHours() + 1);

    // 새로운 시간 문자열 포맷팅
    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");

    // 상태 업데이트
    // setSelectedTime(value);
    setCalculatedTime(`${newHours}:00`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <form className={styles.inputContainer}>
          <p className={styles.form_placeorder}>
            시작 시간대를 선택해주세요.
            <span id={styles.question} title="오전12:00부터 오후11:00까지 1시간 단위로 설정할 수 있습니다. 종료시간은 자동으로 설정됩니다."> Q </span>
          </p>
          <div className={styles.timediv}>
            <input
              className={styles.input2}
              type="time"
              value={time}
              onChange={handleChange}
              step="60" // 분 단위의 입력을 허용
            />
            <p className={styles.form_placeorder}>~</p>
            <input
              id="calculatedTime"
              className={styles.input2}
              type="time"
              value={calculatedTime}
              readOnly
            />
          </div>
          <p className={styles.form_placeorder}>기준 월을 선택해주세요.</p>
          <select className={styles.input} name="month">
            <option value="1월">1월</option>
            <option value="2월">2월</option>
            <option value="3월">3월</option>
            <option value="4월">4월</option>
            <option value="5월">5월</option>
            <option value="6월">6월</option>
            <option value="7월">7월</option>
            <option value="8월">8월</option>
            <option value="9월">9월</option>
            <option value="10월">10월</option>
            <option value="11월">11월</option>
            <option value="12월">12월</option>
          </select>
          <p className={styles.form_placeorder}>장소를 선택해주세요.</p>
          <select className={styles.input} name="place">
            <option value="광산구">광산구</option>
            <option value="남구">남구</option>
            <option value="동구">동구</option>
            <option value="북구">북구</option>
            <option value="서구">서구</option>
          </select>
        </form>
        <button className={styles.button}>적용하기</button>
      </div>

      {/* <div className={styles.mapContainer}>
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
      </div> */}
    </div>
  );
}
