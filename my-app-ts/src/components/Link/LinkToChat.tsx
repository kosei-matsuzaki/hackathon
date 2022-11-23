import React from "react";
import { useHistory, useParams } from "react-router-dom";

const LinkToChat = () => {

    const history = useHistory();
    //query parameter取得
    const urlParams = useParams<{username:string}>()

    //go to chat
    const onClickForChat = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/chat/" + urlParams.username,
            state:{check:"ok"}
        })
    }

    return(
        <button onClick={(e) => {onClickForChat(e)}}>チャット</button>
    )
}

export default LinkToChat;