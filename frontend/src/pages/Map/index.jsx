import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import PinMap from "./PinMap";
import PoliLineMap from "./PoliLineMap";
import axios from "axios";
import responseData from "../../responseData.json";
export default function Main() {
  const [activeType, setActiveType] = useState("일상");
  const [values, setValues] = useState({
    hotel: 0,
    food: 0,
    elderlyCare: 0,
    elderlyJobs: 0,
    largeStore: 0,
    exemplaryRestaurant: 0,
    culturalFacilities: 0,
    medicalFacilities: 0,
  });
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  useEffect(() => {
    setData(responseData.message.data);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("url", values);
      // handle response
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <form className={styles.inputContainer}>
          <p className={styles.form_placeorder}>
            항목별 중요도를 선택해주세요.
          </p>
          <label htmlFor="hotel">관광호텔업 : {values.hotel}</label>
          <input
            type="range"
            name="hotel"
            min="0"
            max="10"
            value={values.hotel}
            onChange={handleChange}
          />
          <label htmlFor="food">광주맛집 : {values.food}</label>
          <input
            type="range"
            name="food"
            min="0"
            max="10"
            value={values.food}
            onChange={handleChange}
          />
          <label htmlFor="elderlyCare">
            노인요양시설 : {values.elderlyCare}
          </label>
          <input
            type="range"
            name="elderlyCare"
            min="0"
            max="10"
            value={values.elderlyCare}
            onChange={handleChange}
          />
          <label htmlFor="elderlyJobs">노인일자리 : {values.elderlyJobs}</label>
          <input
            type="range"
            name="elderlyJobs"
            min="0"
            max="10"
            value={values.elderlyJobs}
            onChange={handleChange}
          />
          <label htmlFor="largeStore">대규모점포 : {values.largeStore}</label>
          <input
            type="range"
            name="largeStore"
            min="0"
            max="10"
            value={values.largeStore}
            onChange={handleChange}
          />
          <label htmlFor="exemplaryRestaurant">
            모범음식점 : {values.exemplaryRestaurant}
          </label>
          <input
            type="range"
            name="exemplaryRestaurant"
            min="0"
            max="10"
            value={values.exemplaryRestaurant}
            onChange={handleChange}
          />
          <label htmlFor="culturalFacilities">
            문화시설정보 : {values.culturalFacilities}
          </label>
          <input
            type="range"
            name="culturalFacilities"
            min="0"
            max="10"
            value={values.culturalFacilities}
            onChange={handleChange}
          />
          <label htmlFor="medicalFacilities">
            의료기관 : {values.medicalFacilities}
          </label>
          <input
            type="range"
            name="medicalFacilities"
            min="0"
            max="10"
            value={values.medicalFacilities}
            onChange={handleChange}
          />
        </form>
        <button className={styles.button} onClick={submitHandler}>
          적용하기
        </button>
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
        </div>

        {activeType === "일상" ? <PoliLineMap data={data} /> : <PinMap />}
      </div>
    </div>
  );
}
