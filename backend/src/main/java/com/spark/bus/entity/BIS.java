package com.spark.bus.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
public class BIS {
    //노선ID
    int routID;

    //노선명
    String routeName;

    //정류소ID,
    int stopID;

    //정류소명_x
    String stopNameX;

    //정류소명_y
    String stopNameY;

    //ARS_ID
    int ARS_ID;

    //경도
    double longitude;

    //위도
    double latitude;

    //정류장구분
    int stopType;

    //기점
    String startingPoint;

    //종점
    String endPoint;

    //첫차시각
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime firstTime;

    //막차시각
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime lastTime;

    //배차간격
    int interval;

    //노선종류
    int routeType;

    //연번
    int serialNumber;

    //자치구
    String district;

    //주소
    String address;

    //행정동명
    String administrativeDistrictName;
}
