import React from "react";
import styles from "./daily.module.css";
import PinMap from "./PinMap";
import PoliLineMap from "./PinMap";

export default function TourComponent({ activeButton }) {
  return (
    <>
      {activeButton === "busStop" ? (
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
          </form>
          <PoliLineMap />
        </>
      ) : (
        <>
          <form className={styles.placeInputContainer}>
            <input
              className={styles.placeInput}
              type="text"
              placeholder="정류장을 입력해주세요."
            />
          </form>
          <PinMap />
        </>
      )}
    </>
  );
}
