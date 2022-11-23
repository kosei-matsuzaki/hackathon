import React from "react";
import { useHistory} from "react-router-dom";

const LinkToLogin = () => {

    const history = useHistory();

    //logout
    const onClickForSignOut = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(window.confirm("ログアウトしますか？")){
           history.push("/login") 
        }    
    }

    return(
        <button onClick={(e) => {onClickForSignOut(e)}}>サインアウト</button>
    )
}
export default LinkToLogin