import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import PinMap from "./PinMap";
import PoliLineMap from "./PoliLineMap";
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
  const [data, setData] = useState([]);

  // input태그 드래그 핸들러
  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setData(responseData.message.data);
  }, []);

  //적용하기 버튼을 누르면 -> 통신
  const [rspdata, setRspData] = useState(""); //응답데이터 받을 곳
  const formRef = useRef(null); //form데이터 인식
  const djangoapi = process.env.REACT_APP_DNN_URL;
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("🔥");
    const formData = new FormData(formRef.current);
    // if (formRef.current) {
    //   const formData = new FormData(formRef.current);
    //   // 폼 데이터를 로그에 출력합니다. (확인용)
    //   for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    //   }
    // }

    // FormData를 JSON으로 변환합니다.
    const datatemp = {};
    formData.forEach((value, key) => {
      datatemp[key] = value;
    });

    //post요청 보내기
    try {
      const response = await fetch(djangoapi, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        //여기 아직 고쳐야함
        body: '{"hotel": 2,"food": 0,"elderlyCare": 0,"elderlyJobs": 0,"largeStore": 0,"exemplaryRestaurant": 0,"culturalFacilities": 0,"medicalFacilities": 0}', //JSON.stringify(datatemp),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }else{
        console.log(response)
      }
      const res = await response.json();
      // console.log("응답 데이터:", res.message.data);
      //전달해줄 데이터 정리하기
      const cleanedItems = res.message.data.map((item) => ({
        name: item.정류소명,
        latitude: item.y,
        longitude: item.x,
      }));
      // console.log(cleanedItems);
      setRspData(cleanedItems);
    } catch (err) {
      console.error("적용하기 오류:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <form ref={formRef} className={styles.inputContainer} method="POST">
          <p className={styles.title}>⭐️항목별 중요도를 선택해주세요⭐️</p>
          <label htmlFor="hotel">관광호텔업 : {values.hotel}</label>
          <input
            type="range"
            name="hotel"
            min="0"
            max="10"
            value={values.hotel}
            onChange={handleChange}
            className={styles.rangeInput}
          />
          <label htmlFor="food">광주맛집 : {values.food}</label>
          <input
            type="range"
            name="food"
            min="0"
            max="10"
            value={values.food}
            onChange={handleChange}
            className={styles.rangeInput}
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
            className={styles.rangeInput}
          />
          <label htmlFor="elderlyJobs">노인일자리 : {values.elderlyJobs}</label>
          <input
            type="range"
            name="elderlyJobs"
            min="0"
            max="10"
            value={values.elderlyJobs}
            onChange={handleChange}
            className={styles.rangeInput}
          />
          <label htmlFor="largeStore">대규모점포 : {values.largeStore}</label>
          <input
            type="range"
            name="largeStore"
            min="0"
            max="10"
            value={values.largeStore}
            onChange={handleChange}
            className={styles.rangeInput}
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
            className={styles.rangeInput}
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
            className={styles.rangeInput}
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
            className={styles.rangeInput}
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

        {activeType === "일상" ? <PoliLineMap data={rspdata} /> : <PinMap />}
      </div>
    </div>
  );
}
