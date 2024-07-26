import React from "react";
import styles from "./daily.module.css";
import PoliLineMap from "./PoliLineMap";
export default function DailyComponent() {
  return (
    <>
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
        <PoliLineMap />
      </form>
    </>
  );
}
