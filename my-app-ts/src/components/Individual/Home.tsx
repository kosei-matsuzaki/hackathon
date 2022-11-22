import React, {useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import Status from "./componentsForHome/Status"
import ReceivedLog from "./componentsForHome/ReceivedLog"
import SentLog from "./componentsForHome/SentLog"
import LinkToChat from "../Link/LinkToChat"
import LinkToRanking from "../Link/LinkToRanking";
import LinkToLogin from "../Link/LinkToLogin";
import LinkToProfile from "../Link/LinkToProfile";
import SendContribute from "./componentsForHome/SendContribute"
import "../../css/Home.css"

const Home : React.FC = () => {

    //query parameter取得
    const urlParams = useParams<{username:string}>()

    //prevent from URL
    const history = useHistory();
    useEffect(() => {
      if (!history.location.state) history.replace('/login')
    }, [])
    
    //要素表示
    return(
      <div>
        <div>
          <Status urlParams = {urlParams}/>
          <SendContribute urlParams = {urlParams}/>
          <ReceivedLog urlParams = {urlParams}/>
          <SentLog urlParams = {urlParams}/>
        </div>
        <div>
          <div>
            <LinkToProfile/>
            <LinkToChat/>
            <LinkToRanking/>
            <LinkToLogin/>
          </div>
        </div>
      </div>
      
      
    )
}

export default Home