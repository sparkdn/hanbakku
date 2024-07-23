import React from "react";
import styles from "./daily.module.css";
import Map from "./Map";
export default function TourComponent() {
  return (
    <div>
      <form className={styles.placeInputContainer}>
        <input
          className={styles.placeInput}
          type="text"
          placeholder="출발지를 입력해주세요."
        />
        <input
          className={styles.placeInput}
          type="text"
          placeholder="도착지를 입력해주세요."
        />
      </form>
      <Map />
    </div>
  );
}
