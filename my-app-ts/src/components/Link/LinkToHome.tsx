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
        <div className = "div-small" onClick={(e) => {onClickForHome(e)}}>ホーム</div>
    )
}

export default LinkToHome