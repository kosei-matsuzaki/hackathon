import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Move : React.FC = () => {

    const history = useHistory();

    const MoveToLogin = () => {
        history.push("/login")
    }

    useEffect (() => {
        MoveToLogin()
    }, [])

    return(
        <div></div>
    )
}

export default Move