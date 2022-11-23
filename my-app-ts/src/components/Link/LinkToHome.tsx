import React from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../css/Header.css"

const LinkToHome = () => {

    const history = useHistory();
    //query parameter取得
    const urlParams = useParams<{username:string}>()

    //go home
    const onClickForHome = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/individual/" + urlParams.username,
            state:{check:"ok"}
        })
    }

    return(
        <a className = "a" onClick={(e) => {onClickForHome(e)}}>ホームへ戻る</a>
    )
}

export default LinkToHome