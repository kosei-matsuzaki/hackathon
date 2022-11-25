import React from "react";
import { useHistory} from "react-router-dom";
import "../../css/General.css"

const LinkToLogin = () => {

    const history = useHistory();

    //logout
    const onClickForSignOut = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(window.confirm("ログアウトしますか？")){
           history.push("/login") 
        }    
    }

    return(
        <div className = "div-small" onClick={(e) => {onClickForSignOut(e)}}>サインアウト</div>
    )
}
export default LinkToLogin