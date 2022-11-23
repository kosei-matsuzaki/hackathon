import { useHistory } from "react-router-dom";
import React, {useState, useEffect} from "react";
import LinkToChat from "../../Link/LinkToChat";
import LinkToHome from "../../Link/LinkToHome"
import LinkToLogin from "../../Link/LinkToLogin";
import LinkToRanking from "../../Link/LinkToRanking";

type Props = {
  urlParams: {
  username: string;
  },
  query:{v:number}
}

type Points = {
    contributeSent : number,
    contributeReceived : number
  }

const FetchContribute : React.FC<Props> = ({urlParams, query}) => {
    //contribute定義
    const [contribute, setContribute] = useState<Points>({contributeSent:0, contributeReceived:0})

    //url作成
    const fetchUrlPoint :string = "http://localhost:8000/individual/status?username=" + urlParams.username

    //GET points
    const fetchContribute = async () => {
       try {
           const res = await fetch(fetchUrlPoint);
           if (!res.ok) {
             throw Error(`Failed to fetch contribute: ${res.status}`);
           }

           const contributePoints = await res.json();
           setContribute(contributePoints);
           console.log(contribute)
         } catch (err) {
           console.error(err);
          }
     };
  

     //一度だけ取得
    useEffect (() => {
       fetchContribute()
    },[])

    const history = useHistory();
    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      history.goBack();
    }

    if(query.v === 1){
      return(
        <div className="profile-divAll">
          <div className="profile-divTitle">
              ポイント状況
          </div>
          <ul className="profile-ulProfile">
            <div className="profile-divComponent">
              送ったポイント:{contribute.contributeSent}pt
            </div>
            <div className="profile-divComponent">
              受け取ったポイント:{contribute.contributeReceived}pt
            </div>
          </ul>
          <div>
            <button 
            className="profile-buttonBack"
            onClick={(e) => onClick(e)}>戻る</button>
          </div>
        </div>
      )
    }else if(query.v === 0){
      return(
        <div>
          <div className="profile-divAll">
            <div className="profile-divTitle">
                ポイント状況
            </div>
            <ul className="profile-ulProfile">
              <div className="profile-divComponent">
                送ったポイント:{contribute.contributeSent}pt
              </div>
              <div className="profile-divComponent">
                受け取ったポイント:{contribute.contributeReceived}pt
              </div>
            </ul>
          </div>
          <LinkToHome/>
          <LinkToChat/>
          <LinkToRanking/>
          <LinkToLogin/>
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
    
}

export default FetchContribute