import React, { useEffect, useState } from "react";
import Papa from "papaparse";
const { kakao } = window;

export default function PinMap() {
  const [map, setMap] = useState(null);
  const [locations, setLocations] = useState([]);

  const csvFilePath = "관광지.csv"; // public에 위치한 CSV 파일 경로

  // CSV 파일을 파싱하고 locations 상태를 업데이트합니다.
  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      delimiter: ",",
      header: true,
      complete: (results) => {
        setLocations(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, [csvFilePath]);

  // 지도를 초기화합니다.
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      const mapOptions = {
        center: new kakao.maps.LatLng(35.1595454, 126.8526012), // 초기 중심 좌표
        level: 7,
      };
      const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
      setMap(kakaoMap);
    }
  }, []);

  useEffect(() => {
    if (map && locations.length > 0) {
      const firstLocation = locations[0];
      const lat = firstLocation.latitude;
      const lng = firstLocation.longitude;

      if (!isNaN(lat) && !isNaN(lng)) {
        const newCenter = new kakao.maps.LatLng(lat, lng);
        map.setCenter(newCenter);

        locations.forEach((location) => {
          const latLng = new kakao.maps.LatLng(
            location.latitude,
            location.longitude
          );

          const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          const imageSize = new kakao.maps.Size(30, 40);
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          const marker = new kakao.maps.Marker({
            map: map,
            position: latLng,
            image: markerImage,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:20px;">${location.name}</div>`,
          });

          kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(map, marker);
          });

          kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close();
          });
        });
      }
    }
  }, [map, locations]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%" }} // 인라인 스타일
    ></div>
  );
}
