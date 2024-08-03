import React, { useEffect, useState } from "react";
import styles from "./news.css";
import ListView from "./listview";
import moment from "moment";
// import 'moment.local.ko';
import ReactPaginate from "react-paginate";

function News() {
    const [news, setNews] = useState([]);
    const [nowtime, setTime] = useState("");
    const [hasResults, setHasResults] = useState(true); // 검색 결과가 있는지 여부를 나타내는 상태
    const [error, setError] = useState(null); // 에러 메시지를 저장할 상태
    const [pageCount, setPageCount] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    // --- naver 검색 api 관련 ---
    const uri = "/api/v1/search/news.json?query=" + encodeURIComponent("광주광역시 교통") + "&display=30";
    const client_id = process.env.REACT_APP_MY_NAVER_CLIENT_ID;
    const client_secret = process.env.REACT_APP_MY_NAVER_CLIENT_SECRET;

    useEffect(() => {
        fetch(uri, {
            method: "GET",
            headers: {
                "X-Naver-Client-Id": client_id,
                "X-Naver-Client-Secret": client_secret,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log("id:", process.env.REACT_APP_MY_NAVER_CLIENT_ID)
                if (!res || !res.items) {
                    setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
                    setHasResults(false);
                    return;
                }
                setTime(res.lastBuildDate);

                if (res.items.length === 0)
                    setHasResults(false); // 검색 결과가 없음을 표시
                else
                    setHasResults(true); // 검색 결과가 있음을 표시

                // HTML 태그 제거 함수
                function removeHtmlTags(str) {
                    const doc = new DOMParser().parseFromString(str, 'text/html');
                    return doc.body.textContent || "";
                }

                // description 필드에서 HTML 태그 제거
                const cleanedItems = res.items.map(item => ({
                    ...item,
                    title: removeHtmlTags(item.title),
                    description: removeHtmlTags(item.description)
                }));

                setNews(cleanedItems);
            })
            .catch(error => {
                console.error('Error', error);
                setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
                setHasResults(false);
            });
    }, [uri, client_id, client_secret]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(news.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(news.length / itemsPerPage));
    }, [news, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % news.length;
        setItemOffset(newOffset);
    };

    const nowtimef = moment(nowtime).format('YYYY년 M월 D일 HH시 mm분');

    return (
        <div className="box">
            <div className="newstitle">
                <h1>광주광역시 교통 뉴스 <span id="nowtime">기준시간 : {nowtimef}</span></h1>
                <details className="newsdetail">
                    <summary>검색 결과 설명</summary>
                    <p>기준시간 기준 Naver에서 "광주광역시 교통" 관련성 기준으로 검색 결과 상위 30개</p>
                </details>
            </div>
            <div className="newsbox">
                {error ? (
                    <p>{error}</p>
                ) : hasResults ? (
                    currentItems.map((item, index) => (
                        <ListView
                            key={index}
                            title={item.title}
                            originallink={item.originallink}
                            link={item.link}
                            description={item.description}
                            pubDate={item.pubDate}
                        />
                    ))
                ) : (<p>검색결과가 없습니다.</p>)}
            </div>
            {/* 페이지네이션 */}
            <ReactPaginate
                previousLabel="< previous"
                breakLabel="..."
                nextLabel="next >"

                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                renderOnZeroPageCount={null}

                containerClassName={"pagination"}
                pageLinkClassName={"pagination__link"}
                activeLinkClassName={"pagination__link__active"}
            />
        </div>
    );
}

export default News;