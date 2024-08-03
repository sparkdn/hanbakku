import React from "react";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import styles from "./powerbi.css";

function PowerBI() {

    const mypowerbiid = process.env.REACT_APP_MY_POWERBI_ID;
    const mypowerbiul = process.env.REACT_APP_MY_POWERBI_ID_URL;
    const mypowerbitoken = process.env.REACT_APP_MY_POWERBI_TOKEN;

    return (
        <div className="box">
            <PowerBIEmbed
                embedConfig={
                    {
                        type: 'report', // Supported types: report, dashboard, tile, visual, and qna.
                        id: mypowerbiid,
                        embedUrl:mypowerbiul,
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