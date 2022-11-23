import { url } from "inspector";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

const LinkToProfile = () => {
    
    const history = useHistory();
    //query parameter取得
    const urlParams = useParams<{username:string}>()

    //go to profile
    const onClickForProfile = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push({
            pathname:"/profile/" + urlParams.username,
            state:{v:0}
        })
    }

    return(
        <button onClick={(e) => {onClickForProfile(e)}}>プロフィール</button>
    )
}

export default LinkToProfile