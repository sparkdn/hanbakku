import React from "react";
import moment from "moment";

const ListView = (props)=>{
    const timef = moment(props.pubDate).format('YYYY년 M월 D일 HH시 mm분');

    
    return (
        <div className="listArea">
            <a href={props.link} >
                <h3>{props.title}</h3>
                <p>{timef}</p>
                <p>{props.description}</p>
            </a>
        </div>
    )
}

export default ListView;