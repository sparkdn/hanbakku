import React, { useEffect, useState } from "react";
const { kakao } = window;

export default function PoliLineMap() {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시한 곳
    const mapOptions = {
      center: new kakao.maps.LatLng(35.1595454, 126.8526012),
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, []);
  return (
    <div
      id="map"
      style={{ width: "90%", height: "700px" }} // 인라인 스타일
    ></div>
  );
}
