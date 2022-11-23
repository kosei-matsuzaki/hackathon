import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

type Ranking = {
    username :string ,
    contributeSent :number
}

const Server : React.FC = () => {

    const fetchUrl = "https://hackathon-vfujicgnka-uc.a.run.app/global/ranking/server"

    const [serverRanking,setServerRanking] = useState<Ranking[]>([])

    const fetchServerRanking = async() => {
        try {
            const res = await fetch(fetchUrl);
            if (!res.ok) {
              throw Error(`Failed to fetch users: ${res.status}`);
            }
      
            const send = await res.json();
            setServerRanking(send);
            console.log(serverRanking)
          } catch (err) {
            console.error(err);
          }
        };
  
      //一度だけ取得
      useEffect (() => {
        fetchServerRanking()
      },[])

      const history = useHistory();

      //onclick
      const onClick = (e:React.MouseEvent<HTMLDivElement>, username:string) => {
        e.preventDefault();
        history.push({
          pathname:"/profile/" + username,
          state:{v:1}
      })
      }
    

    return(
      <div className="ranking-divAll">
        <div className="ranking-divTitle">送信ポイント</div>
        <div className="div-box">
          <div className="ranking-divList">
          {serverRanking.map(rank => {
            return(
              <div 
              className="ranking-divComponent"
              key={rank.username}> 
                <div 
                onClick={(e) => onClick(e, rank.username)}
                className="ranking-divUsername">
                  {rank.username}
                </div>
                <div className="ranking-divPoint">
                  {rank.contributeSent} pt
                </div>  
              </div>
            )
          })}
        </div>
      </div>           
  </div>
    )
}

export default Server