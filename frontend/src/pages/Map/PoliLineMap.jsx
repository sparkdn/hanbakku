import React, { useEffect, useState } from "react";
import axios from "axios";
const { kakao } = window;

export default function PoliLineMap({ data }) {
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

  const getDirection = async (start, waypoints, end) => {
    const url = "https://apis-navi.kakaomobility.com/v1/directions";
    const origin = `${start.longitude},${start.latitude}`;
    const destination = `${end.longitude},${end.latitude}`;
    const waypointsString = waypoints
      .map((wp) => `${wp.longitude},${wp.latitude}`)
      .join("|");

    const requestUrl = `${url}?origin=${origin}&destination=${destination}&waypoints=${waypointsString}`;

    try {
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MOBILITY_KEY}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.routes[0].sections[0];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      const allRoutes = [];
      for (let i = 0; i < data.length; i += 5) {
        const start = data[i];
        const waypoints = data.slice(i + 1, i + 6);
        const end = i + 6 < data.length ? data[i + 6] : data[data.length - 1];
        const route = await getDirection(start, waypoints, end);

        if (route) {
          allRoutes.push(route);
        }
      }
      setRoutes(allRoutes);
    };

    fetchRoutes();
  }, [data]);

  useEffect(() => {
    if (routes.length > 0) {
      const linePath = [];
      routes.forEach((route) => {
        route.roads.forEach((road) => {
          for (let i = 0; i < road.vertexes.length; i += 2) {
            const lng = road.vertexes[i];
            const lat = road.vertexes[i + 1];
            linePath.push(new kakao.maps.LatLng(lat, lng));
          }
        });
      });

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#000000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });
      polyline.setMap(map);
    }
  }, [routes]);
  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
