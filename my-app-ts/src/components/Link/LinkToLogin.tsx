import React from "react";
import { useHistory} from "react-router-dom";
import "../../css/Header.css"

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
        <a className = "a" onClick={(e) => {onClickForSignOut(e)}}>サインアウト</a>
    )
}
export default LinkToLogin