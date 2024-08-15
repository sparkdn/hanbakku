import React from "react";
import Spinner from "../assets/images/loading.gif";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <div>
        <img src={Spinner} alt="로딩 중" width={150} />
        <h3>데이터를 수집 중입니다.</h3>
      </div>
    </div>
  );
}
