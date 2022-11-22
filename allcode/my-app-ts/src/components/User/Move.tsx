import React from "react";
import { useHistory } from "react-router-dom";

const Move : React.FC = () => {

    const history = useHistory();
    //onClick
    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push("/login")
    }

    return(
        <div>
            <button onClick={onClick}>Login画面へ</button>
        </div>
    )
}

export default Move