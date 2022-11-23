import React from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../css/Header.css"

const LinkToChat = () => {

    const history = useHistory();
    //query parameter取得
    const urlParams = useParams<{username:string}>()

    //go to chat
    const onClickForChat = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/chat/" + urlParams.username,
            state:{check:"ok"}
        })
    }

    return(
        <a className = "a" onClick={(e) => {onClickForChat(e)}}>チャット</a>
    )
}

export default LinkToChat;