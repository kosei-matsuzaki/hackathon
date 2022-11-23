import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import DeleteLog from "./DeleteLog"

type Sent = {
    id: string,
    receiverName:string,
    sendPoint:number,
    message:string
}

type Props = {
    urlParams: {
        username: string;
    }
}

const ReceivedLog :React.FC<Props> = ({urlParams}) => {

    //send定義
    const [send, setSend] = useState<Sent[]>([])

    const fetchUrl = "https://hackathon-vfujicgnka-uc.a.run.app/individual/log/sent?username=" + urlParams.username

    //Get sent
    const fetchLogSent = async () => {
        try {
          const res = await fetch(fetchUrl);
          if (!res.ok) {
            throw Error(`Failed to fetch users: ${res.status}`);
          }
    
          const SentLog = await res.json();
          setSend(SentLog);
          console.log(send)
        } catch (err) {
          console.error(err);
        }
      };

    //一度だけ取得
    useEffect (() => {
      fetchLogSent()
    },[])

    const history = useHistory();

    //onclick
    const onClick = (e:React.MouseEvent<HTMLSpanElement>, username:string) => {
      e.preventDefault();
      history.push({
        pathname:"/profile/" + username,
        state:{v:1}
    })
    }

    if (send.length == 0) {
      return(
        <div className="home-logDiv-all">
          <div className="home-logDiv-title">
                送信記録
            </div>
            <div className="div-box">
            <div className="home-logDiv-list">
                 <div>
                    送信記録はありません         
                 </div>
            </div>
          </div>
        </div>
    )}else{
    return(
        <div className="home-logDiv-all">
            <div className="home-logDiv-title">
                送信記録
            </div>
            <div className="div-box">
              <div className="home-logDiv-list">
                {send.map(log => {
                    return(
                        <ul
                        className="home-logUl" 
                        key={log.id}>
                            <div className="home-logDiv-inUl">
                               <div className="home-logDiv-combine">
                                  <div className="home-logDiv-componentPass">  
                                    <span className="home-span" onClick={(e) => onClick(e, log.receiverName)}>{log.receiverName}</span> へ {log.sendPoint} pt送りました。
                                  </div>
                                  <div className="home-logDiv-componentMessage">{log.message}</div>  
                               </div> 
                               <div className="home-logDiv-ForButton">
                                 <DeleteLog id={log.id}/>
                               </div>                
                            </div>           
                        </ul>
                    )
                })}
              </div>
            </div>
        </div>
    )}
}

export default ReceivedLog
