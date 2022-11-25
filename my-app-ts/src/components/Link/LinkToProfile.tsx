import React from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../css/General.css"

const LinkToProfile = () => {
    
    const history = useHistory();
    //query parameter取得
    const urlParams = useParams<{username:string}>()

    //go to profile
    const onClickForProfile = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/profile/" + urlParams.username,
            state:{v:0}
        })
    }

    return(
        <div className = "div-small" onClick={(e) => {onClickForProfile(e)}}>プロフィール</div>
    )
}

export default LinkToProfile