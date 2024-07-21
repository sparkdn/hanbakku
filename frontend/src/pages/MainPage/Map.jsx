import React, { useEffect, useState } from "react";
import axios from "axios";

const { kakao } = window;
export default function Map() {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시한 곳
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, []);
  return (
    <div>
      <div id="map" style={{ width: "1000px", height: "550px" }}></div>
    </div>
  );
}
