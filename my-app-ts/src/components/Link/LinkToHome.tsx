import React from "react";
import { useHistory, useParams } from "react-router-dom";

const LinkToHome = () => {

    const history = useHistory();
    //query parameter取得
    const urlParams = useParams<{username:string}>()

    //go home
    const onClickForHome = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/individual/" + urlParams.username,
            state:{check:"ok"}
        })
    }

    return(
        <div>
            <button onClick={(e) => {onClickForHome(e)}}>ホームへ戻る</button>
        </div>
    )
}

export default LinkToHome