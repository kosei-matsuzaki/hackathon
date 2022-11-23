import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"

type Ranking = {
    username :string ,
    contributeReceived :number
}

const Receiver : React.FC = () => {

    const fetchUrl = "http://localhost:8000/global/ranking/receiver"

    const [receiverRanking,setReceiverRanking] = useState<Ranking[]>([])

    //receiver ranking 取得
    const fetchReceiverRanking = async() => {
        try {
            const res = await fetch(fetchUrl);
            if (!res.ok) {
              throw Error(`Failed to fetch users: ${res.status}`);
            }
      
            const Receive = await res.json();
            setReceiverRanking(Receive);
            console.log(receiverRanking)
          } catch (err) {
            console.error(err);
          }
        };
  
      //一度だけ取得
      useEffect (() => {
        fetchReceiverRanking()
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
            <div className="ranking-divTitle">受信ポイント</div>
            <div className="ranking-divList">
            {receiverRanking.map(rank => {
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
                        {rank.contributeReceived} pt
                      </div>  
                    </div>
                )
            })}
            </div>           
        </div>
    )
}

export default Receiver