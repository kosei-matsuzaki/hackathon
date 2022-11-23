import React from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../css/Header.css"

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
        <a className = "a" onClick={(e) => {onClickForProfile(e)}}>プロフィール</a>
    )
}

export default LinkToProfile