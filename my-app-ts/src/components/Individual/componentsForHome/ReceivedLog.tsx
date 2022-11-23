import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

type Receive = {
    id: string,
    serverName:string,
    sendPoint:number,
    message:string
}

type Props = {
  urlParams: {
    username: string;
}
}

const ReceivedLog : React.FC<Props> = ({urlParams}) => {

    //receive定義
    const [receive, setReceive] = useState<Receive[]>([])

    const fetchUrl = "https://hackathon-vfujicgnka-uc.a.run.app/individual/log/received?username=" + urlParams.username

    //Get received
    const fetchLogReceived = async() => {
        try {
          const res = await fetch(fetchUrl);
          if (!res.ok) {
            throw Error(`Failed to fetch users: ${res.status}`);
          }
    
          const ReceiveLog = await res.json();
          setReceive(ReceiveLog);
          console.log(receive)
        } catch (err) {
          console.error(err);
        }
      };

    //一度だけ取得
    useEffect (() => {
      fetchLogReceived()
    },[])

    const history = useHistory(); 
    
    //onClick
    const onClick = (e:React.MouseEvent<HTMLSpanElement>, username:string) => {
      e.preventDefault();
      history.push({
        pathname:"/profile/" + username,
        state:{v:1}
    })
    }

    if (receive.length === 0) {
      return(
        <div className="home-logDiv-all">
            <div className="home-logDiv-title">
                受信記録
            </div>
            <div className="div-box">
              <div className="home-logDiv-list">
                 <div>
                    受信記録はありません         
                 </div>
              </div>
            </div>
        </div>
    )}else{
    return(
      <div className="home-logDiv-all">
        <div className="home-logDiv-title">
          受信記録
        </div>
        <div className="div-box">
            <div className="home-logDiv-list">
                {receive.map(log => {
                    return(
                      <ul 
                        className="home-logUl" 
                        key={log.id}>
                        <div className="home-logDiv-inUl">
                          <div className="home-logDiv-combine">
                            <div className="home-logDiv-componentPass">
                              <span className="home-span" onClick={(e) => onClick(e, log.serverName)}>{log.serverName}</span> さんから {log.sendPoint} pt受け取りました。
                            </div>
                            <div className="home-logDiv-componentMessage">{log.message}</div>
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