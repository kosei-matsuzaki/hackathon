import React from "react";
import { useHistory, useParams} from "react-router-dom";
import "../../css/Header.css"

const LinkToRanking = () => {
    
    const history = useHistory();
     //query parameter取得
     const urlParams = useParams<{username:string}>()

    //go to ranking
    const onClickForRanking = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/ranking/" + urlParams.username,
            state:{check:"ok"}
        })
    }

    return(
       <div className = "a" onClick={(e) => {onClickForRanking(e)}}>ランキング</div>
    )
}
export default LinkToRanking