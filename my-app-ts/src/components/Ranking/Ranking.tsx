import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import LinkToChat from "../Link/LinkToChat";
import LinkToHome from "../Link/LinkToHome";
import LinkToLogin from "../Link/LinkToLogin";
import LinkToProfile from "../Link/LinkToProfile";
import Receiver from "./componentsForRanking/Receiver"
import Server from "./componentsForRanking/Server"
import "../../css/Ranking.css"
import "../../css/General.css"
import LinkToRanking from "../Link/LinkToRanking";

const Ranking : React.FC = () => {

    //prevent from URL
    const history = useHistory();
    useEffect(() => {
      if (!history.location.state) history.replace('/login')
    }, [])
    
    return(
        <div>
            <header>
                <h1 className="h1">Contribute</h1>
                <div className="div">
                    <ul className="ul">
                       <LinkToHome/>
                       <LinkToRanking/>
                       <LinkToChat/>
                       <LinkToProfile/>
                       <LinkToLogin/>
                    </ul>
                </div>
            </header>
            <div className="ranking-divAll">
               <div className="ranking-divTitle">
                  ランキング一覧
               </div>
               <div>
                  <Receiver/>    
                  <Server/>       
                </div>
            </div>
        </div>
    )
}

export default Ranking