import React, { useState, useEffect } from "react";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import styles from "./powerbi.css";
import { PublicClientApplication } from '@azure/msal-browser';


function PowerBI() {
    // // 1. azure 사용자 인증, 사용자 token 받아오기
    // const [accessToken, setAcsToken] = useState("");
    // const msalConfig = {
    //     auth: {
    //         clientId: process.env.REACT_APP_AZ_CLIENT_ID,
    //         authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZ_TENANT_ID}`,
    //         redirectUri: process.env.REACT_APP_AZ_REDIRECT_URI,
    //     },
    //     cache: {
    //         cacheLocation: 'sessionStorage',
    //         storeAuthStateInCookie: false,
    //     },
    // };localStorage

    // const pca = new PublicClientApplication(msalConfig);

    // // 1-2. 로그인 요청
    // useEffect(() => {
    //     // 비동기 함수 정의 및 호출
    //     const handleAuth = async () => {
    //         await pca.initialize();
    //         try {
    //             // 리디렉션 후 응답 처리
    //             const response = await pca.handleRedirectPromise();

    //             if (response) {
    //                 // 리디렉션 후 응답 처리
    //                 setAcsToken(response.accessToken);
    //             } else {
    //                 // 리디렉션이 없는 경우 로그인 프로세스 시작
    //                 const loginRequest = {
    //                     scopes: ["https://api.powerbi.com/.default"]
    //                 };
    //                 await pca.loginRedirect(loginRequest);
    //             }
    //         } catch (error) {
    //             console.error('리디렉션 처리 오류:', error);
    //         }
    //     };

    //     handleAuth();
    // }, [pca]);

    //2. powerbi 보고서 token 발급
    // const [myPBtoken, setPBToken] = useState("");
    const mypowerbigoupid = process.env.REACT_APP_MY_POWERBI_GROUP_ID;
    const mypowerbiid = process.env.REACT_APP_MY_POWERBI_ID;
    const mypowerbiul = process.env.REACT_APP_MY_POWERBI_ID_URL;
    const mypowerbitoken = process.env.REACT_APP_MY_POWERBI_TOKEN;
    const uri = "https://api.powerbi.com/v1.0/myorg/groups/" + mypowerbigoupid + "/reports/" + mypowerbiid + "/GenerateToken"

    // useEffect(() => {
    //     fetch(uri, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': mypowerbitoken,//`Bearer ${accessToken}`,
    //         },
    //         body: {
    //             "accessLevel": "View",
    //             "allowSaveAs": "false"
    //         },
    //     })
    //         .then(res => {
    //             console.log(res);
    //             res.json();
    //         }).then(res => setPBToken(res.token));

    // }, []);

    return (
        <div className="box">
            <PowerBIEmbed
                embedConfig={
                    {
                        type: 'report', // Supported types: report, dashboard, tile, visual, and qna.
                        id: mypowerbiid,
                        embedUrl: mypowerbiul,
                        accessToken: mypowerbitoken,
                        tokenType: models.TokenType.Embed, // Use models.TokenType.Aad if you're embedding for your organization.
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
                                }
                            },
                        }
                    }
                }

                eventHandlers={
                    new Map([
                        ['loaded', function () {
                            console.log('Report loaded');
                        }],
                        ['rendered', function () {
                            console.log('Report rendered');
                        }],
                        ['error', function (event) {
                            console.log(event.detail);
                        }]
                    ])
                }

                cssClassName={
                    "report-style-class"
                }

                getEmbeddedComponent={
                    (embeddedReport) => {
                        window.report = embeddedReport;
                    }
                }
            />

        </div>
    );

}

export default PowerBI;