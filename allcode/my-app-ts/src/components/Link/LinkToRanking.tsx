import React from "react";
import { useHistory, useParams} from "react-router-dom";

const LinkToRanking = () => {
    
    const history = useHistory();
     //query parameter取得
     const urlParams = useParams<{username:string}>()

    //go to ranking
    const onClickForRanking = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/ranking/" + urlParams.username,
            state:{check:"ok"}
        })
    }

    return(
            <div>
                <button onClick={(e) => {onClickForRanking(e)}}>ランキング</button>
            </div>
    )
}
export default LinkToRanking