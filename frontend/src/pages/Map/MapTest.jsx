import React, { useEffect, useState } from "react";
const { kakao } = window;

export default function MapTest() {
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);
  const [pointObj, setPointObj] = useState({
    startPoint: { marker: null, lat: null, lng: null },
    endPoint: { marker: null, lat: null, lng: null },
  });

  const getCarDirection = async () => {
    const url = "https://apis-navi.kakaomobility.com/v1/directions";

    // 출발지(origin), 목적지(destination)의 좌표를 문자열로 변환합니다.
    const origin = `${pointObj.startPoint.lng},${pointObj.startPoint.lat}`;
    const destination = `${pointObj.endPoint.lng},${pointObj.endPoint.lat}`;

    const queryParams = new URLSearchParams({
      origin: origin,
      destination: destination,
    });
    const requestUrl = `${url}?${queryParams}`; // 파라미터까지 포함된 전체 URL
    await axios
      .get(requestUrl, {
        headers: {
          Authorization: `KakaoAK ${REACT_APP_KAKAO_MOBILITY_KE}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // 응답 데이터 처리
        setData(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching directions:",
          error.response?.data || error.message
        );
      });
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시한 곳
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, []);

  const setCenter = (lat, lng) => {
    if (map) {
      const moveLatLon = new kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }
  };

  useEffect(() => {
    if (data) {
      const linePath = [];
      data.routes[0].sections[0].roads.forEach((router) => {
        for (let i = 0; i < router.vertexes.length; i += 2) {
          const lng = router.vertexes[i];
          const lat = router.vertexes[i + 1];
          linePath.push(new kakao.maps.LatLng(lat, lng));
        }
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
  }, [data]);
  const setPoint = ({ lat, lng }, pointType) => {
    if (map) {
      setCenter(lat, lng);
      let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
      });
      marker.setMap(map);

      setPointObj((now) => {
        if (now[pointType].marker) {
          now[pointType].marker.setMap(null);
        }
        return { ...now, [pointType]: { marker, lat, lng } };
      });
    }
  };
  useEffect(() => {
    if (pointObj.startPoint.lat && pointObj.endPoint.lat) {
      getCarDirection();
    }
  }, [pointObj]);
  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      <button
        onClick={() =>
          setPoint({ lat: 35.159541, lng: 126.8821956 }, "startPoint")
        }
      >
        출발지1 지정
      </button>
      <button
        onClick={() => {
          setPoint({ lat: 35.14280065, lng: 126.93472562004405 }, "endPoint");
        }}
      >
        목적지1 설정
      </button>
    </div>
  );
}
