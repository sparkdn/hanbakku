import React, { useEffect, useState } from "react";
import axios from "axios";
const { kakao } = window;

export default function PoliLineMap() {
  const [map, setMap] = useState(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(35.1595454, 126.8526012),
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, []);

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

  const getDirection = async (start, waypoints, end) => {
    const url = "https://apis-navi.kakaomobility.com/v1/directions";
    const origin = `${start.longitude},${start.latitude}`;
    const destination = `${end.longitude},${end.latitude}`;
    const waypointsString = waypoints
      .map((wp) => `${wp.longitude},${wp.latitude}`)
      .join("|");

    const requestUrl = `${url}?origin=${origin}&destination=${destination}&waypoints=${waypointsString}`;

    try {
      const response = await axios
        .get(requestUrl, {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MOBILITY_KEY}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          // return response;
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      const allRoutes = [];
      for (let i = 0; i < locations.length; i += 5) {
        const start = locations[i];
        const waypoints = locations.slice(i + 1, i + 6);
        const end =
          i + 6 < locations.length
            ? locations[i + 6]
            : locations[locations.length - 1];
        const route = await getDirection(start, waypoints, end);

        if (route) {
          allRoutes.push(route);
        }
      }
    };

    fetchRoutes();
  }, [map]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
