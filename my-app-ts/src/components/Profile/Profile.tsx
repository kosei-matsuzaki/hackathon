import React, {useEffect} from "react";
import {useLocation, useHistory, useParams} from "react-router-dom";
import FetchProfile from "./componentsForProfile/FetchProfile"
import FetchContribute from "./componentsForProfile/FetchContribute" 
import "../../css/Profile.css"

type Props = {
  v:number
}

const Profile : () => JSX.Element | any = () => {

    const history = useHistory();
    const location = useLocation<Props>();
    //username取得
    const urlParams = useParams<{username:string}>()

    if (!history.location.state){
      //prevent from URL
        history.replace('/login')
    }else{
    const query = location.state
    
    return(
      <div>
        <FetchProfile urlParams={urlParams} query={query}/>
        <FetchContribute urlParams={urlParams} query={query}/>
      </div>
    )}
}


export default Profile