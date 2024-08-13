import React, { useEffect, useState } from "react";
const { kakao } = window;

export default function PinMap() {
  const [map, setMap] = useState(null);

  // 위치 데이터를 정의
  const locations = [
    { name: "서울역", latitude: 37.55655, longitude: 126.97061 },
    { name: "남산타워", latitude: 37.55117, longitude: 126.98823 },
    { name: "명동성당", latitude: 37.56361, longitude: 126.98767 },
    { name: "동대문디자인플라자", latitude: 37.5665, longitude: 127.009 },
    { name: "청계천", latitude: 37.5701, longitude: 126.9796 },
    { name: "인사동", latitude: 37.5744, longitude: 126.9855 },
    { name: "북촌한옥마을", latitude: 37.5826, longitude: 126.9838 },
    { name: "창덕궁", latitude: 37.5794, longitude: 126.991 },
    { name: "종묘", latitude: 37.5724, longitude: 126.9928 },
    { name: "삼청동", latitude: 37.5873, longitude: 126.9812 },
    { name: "광화문", latitude: 37.57593, longitude: 126.97688 },
  ];

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  useEffect(() => {
    // 지도의 컨테이너를 가져와서 지도를 초기화
    const mapContainer = document.getElementById("map2");
    const mapOptions = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 시청 위치로 중심 설정
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);

    // 마커 추가
    locations.forEach((location) => {
      const position = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      const imageSize = new kakao.maps.Size(30, 40);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: position,
        image: markerImage,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:20px;">${location.name}</div>`,
      });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(kakaoMap, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
    });
  }, []);

  return (
    <div
      id="map2"
      style={{ width: "100%", height: "100%" }} // 인라인 스타일
    ></div>
  );
}
