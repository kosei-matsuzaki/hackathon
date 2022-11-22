import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import LinkToChat from "../Link/LinkToChat";
import LinkToHome from "../Link/LinkToHome";
import LinkToLogin from "../Link/LinkToLogin";
import LinkToProfile from "../Link/LinkToProfile";
import Receiver from "./componentsForRanking/Receiver"
import Server from "./componentsForRanking/Server"
import "../../css/Ranking.css"

const Ranking : React.FC = () => {

    //prevent from URL
    const history = useHistory();
    useEffect(() => {
      if (!history.location.state) history.replace('/login')
    }, [])
    
    return(
        <div>
        <div className="ranking-divAll">
            <div className="ranking-divTitle">
                ランキング一覧
            </div>
            <div>
               <Receiver/>    
               <Server/>       
            </div>
        </div>
            <LinkToHome/>
            <LinkToProfile/>
            <LinkToChat/>
            <LinkToLogin/>
        </div>
    )
}

export default Ranking